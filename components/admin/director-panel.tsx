"use client";

import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  EmployeeDepartment,
  EmployeeProfile,
  EmployeeRole,
  INITIAL_EMPLOYEES_SEED,
  LeadRecord,
  LeadStatus,
} from "@/lib/allowed-employees";
import ImageDropzone from "@/components/admin/image-dropzone";
import {
  Users,
  Inbox,
  ShieldCheck,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Building2,
  Mail,
  Phone,
  Eye,
  EyeOff,
  UserCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

interface DirectorPanelProps {
  currentAdmin: EmployeeProfile;
  onImpersonate: (employee: EmployeeProfile) => void;
}

type AdminTab = "team" | "leads";

const EMPLOYEES_PER_PAGE = 6;

export default function DirectorPanel({
  currentAdmin,
  onImpersonate,
}: DirectorPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("team");

  // --- Estado Equipo & Permisos ---
  const [employees, setEmployees] = useState<EmployeeProfile[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [migratingTeam, setMigratingTeam] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeProfile | null>(null);
  const [savingEmployee, setSavingEmployee] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [employeePage, setEmployeePage] = useState(1);

  // --- Estado Alta Rápida de Nuevo Usuario con Acceso BO ---
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState<{
    fullName: string;
    email: string;
    jobTitle: string;
    department: EmployeeDepartment;
    role: EmployeeRole;
    isPublic: boolean;
    sendMagicLink: boolean;
  }>({
    fullName: "",
    email: "",
    jobTitle: "Agente asociado",
    department: "inmobiliaria",
    role: "employee",
    isPublic: true,
    sendMagicLink: true,
  });
  const [creatingUser, setCreatingUser] = useState(false);
  const [sendingMagicLinkUid, setSendingMagicLinkUid] = useState<string | null>(null);

  // --- Estado Leads ---
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "compra",
    propertyRef: "",
    message: "",
  });

  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);
  const [permissionWarning, setPermissionWarning] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setFeedbackBanner(msg);
    setTimeout(() => setFeedbackBanner(null), 4000);
  };

  // Cargar Equipo y Emails Autorizados
  const fetchTeamData = async () => {
    setLoadingTeam(true);
    try {
      const empSnap = await getDocs(collection(db, "employees"));
      const empList: EmployeeProfile[] = [];
      for (const docItem of empSnap.docs) {
        const rawData = docItem.data() as EmployeeProfile;
        let cleanAvatar = rawData.avatarUrl || "";
        // Si quedaba alguna URL local hardcodeada (/team/...), la limpiamos en Firestore
        if (cleanAvatar.startsWith("/team/")) {
          cleanAvatar = "";
          await updateDoc(doc(db, "employees", docItem.id), {
            avatarUrl: "",
          }).catch(() => null);
        }
        empList.push({
          ...rawData,
          avatarUrl: cleanAvatar,
          uid: docItem.id,
        });
      }

      const migrationSnap = await getDoc(
        doc(db, "settings", "team_migrated")
      ).catch((err) => {
        if (err?.code === "permission-denied") setPermissionWarning(true);
        return null;
      });

      // Auto-migrar la primera vez si aún no se ha ejecutado la migración inicial
      if (migrationSnap && !migrationSnap.exists()) {
        await setDoc(
          doc(db, "settings", "team_migrated"),
          { migrated: true, migratedAt: new Date().toISOString() },
          { merge: true }
        ).catch(() => null);
        await handleMigrateHardcodedTeam();
        return;
      }

      empList.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      setEmployees(empList);
    } catch (err: any) {
      if (err?.code === "permission-denied") {
        setPermissionWarning(true);
      }
      console.error("Error cargando equipo:", err);
    } finally {
      setLoadingTeam(false);
    }
  };

  // Cargar Leads
  const fetchLeadsData = async () => {
    setLoadingLeads(true);
    try {
      const leadsSnap = await getDocs(collection(db, "leads"));
      const list: LeadRecord[] = [];
      leadsSnap.forEach((d) => {
        list.push({
          ...(d.data() as Omit<LeadRecord, "id">),
          id: d.id,
        });
      });
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
      setLeads(list);
    } catch (err) {
      console.error("Error cargando leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
    fetchLeadsData();
  }, []);

  // Bloquear el scroll de la página cuando hay cualquier modal abierto
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      showNewUserModal || editingEmployee || showNewLeadModal
    );
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showNewUserModal, editingEmployee, showNewLeadModal]);

  // --- Acciones Equipo: Envío de Magic Link & Creación de Usuarios ---
  const sendMagicLinkToEmployee = async (emp: EmployeeProfile) => {
    const cleanEmail = emp.email?.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      showToast("El usuario no tiene un correo electrónico válido.");
      return;
    }

    setSendingMagicLinkUid(emp.uid);
    try {
      const token =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

      await updateDoc(doc(db, "employees", emp.uid), {
        magicToken: token,
        magicTokenExpiresAt: expiresAt,
      });

      const magicLinkUrl = `${window.location.origin}/admin?magic_token=${encodeURIComponent(
        token
      )}&uid=${encodeURIComponent(emp.uid)}`;

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_MAGICLINK_TEMPLATE_ID ||
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        showToast(
          "Usuario guardado, pero faltan variables de EmailJS en .env para enviar el correo."
        );
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: cleanEmail,
          email: cleanEmail,
          user_email: cleanEmail,
          from_email: cleanEmail,
          to_name: emp.fullName || "Compañero/a de Viven",
          name: emp.fullName || "Compañero/a de Viven",
          from_name: "Viven Backoffice",
          magic_link: magicLinkUrl,
          subject: "Tu enlace de acceso al Backoffice de Viven",
          message: `Hola ${
            emp.fullName || ""
          }, te hemos dado de alta en el Backoffice de Viven. Pulsa en este enlace para acceder directamente sin contraseña (válido durante 30 minutos): ${magicLinkUrl}`,
        },
        publicKey
      );

      showToast(`Magic Link enviado por correo a ${cleanEmail}.`);
    } catch (err: any) {
      const detail =
        err?.text ||
        err?.message ||
        (typeof err === "string" ? err : "Revisa el Template ID y el campo 'To Email' en EmailJS");
      console.warn("Detalle error EmailJS:", detail, err);
      showToast(`Error EmailJS (${err?.status || ""}): ${detail}`);
    } finally {
      setSendingMagicLinkUid(null);
    }
  };

  const handleCreateNewUserWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newUserForm.email.trim().toLowerCase();
    const cleanName = newUserForm.fullName.trim();

    if (!cleanName || !cleanEmail || !cleanEmail.includes("@")) {
      showToast("Introduce el nombre completo y un correo electrónico válido.");
      return;
    }

    // Verificar que no exista otro usuario con el mismo correo personal
    const duplicate = employees.find(
      (emp) =>
        cleanEmail !== "hola@viven.es" &&
        emp.email?.trim().toLowerCase() === cleanEmail
    );
    if (duplicate) {
      showToast(
        `Ya existe un usuario registrado con el correo ${cleanEmail} (${duplicate.fullName}).`
      );
      return;
    }

    setCreatingUser(true);
    try {
      const newDocRef = doc(collection(db, "employees"));
      const newEmployee: EmployeeProfile = {
        uid: newDocRef.id,
        email: cleanEmail,
        fullName: cleanName,
        jobTitle: newUserForm.jobTitle.trim() || "Agente asociado",
        department: newUserForm.department,
        role: newUserForm.role,
        isPublic: newUserForm.isPublic,
        order: employees.length + 1,
        phone: "",
        whatsapp: "",
        linkedin: "",
        avatarUrl: "",
        bio: "",
        languages: ["🇪🇸 Español"],
        hobbies: [],
        galleryPhotos: [],
        updatedAt: new Date().toISOString(),
      };

      await setDoc(newDocRef, newEmployee);

      setEmployees((prev) =>
        [...prev, newEmployee].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      );

      if (newUserForm.sendMagicLink) {
        await sendMagicLinkToEmployee(newEmployee);
      } else {
        showToast(
          `Usuario ${cleanName} (${cleanEmail}) creado con acceso al Backoffice.`
        );
      }

      setNewUserForm({
        fullName: "",
        email: "",
        jobTitle: "Agente asociado",
        department: "inmobiliaria",
        role: "employee",
        isPublic: true,
        sendMagicLink: true,
      });
      setShowNewUserModal(false);
    } catch (err) {
      console.error("Error creando nuevo usuario:", err);
      showToast("Error al crear el usuario en Firestore.");
    } finally {
      setCreatingUser(false);
    }
  };

  const handleMigrateHardcodedTeam = async () => {
    setMigratingTeam(true);
    try {
      const empSnap = await getDocs(collection(db, "employees"));
      const existingDocs: EmployeeProfile[] = [];
      empSnap.forEach((d) => {
        existingDocs.push({ ...(d.data() as EmployeeProfile), uid: d.id });
      });

      let createdCount = 0;
      let updatedCount = 0;

      for (const seed of INITIAL_EMPLOYEES_SEED) {
        const cleanSeedName = seed.fullName.trim().toLowerCase();
        const cleanSeedEmail = seed.email.trim().toLowerCase();

        // Buscar si ya existe por nombre exacto o por email personal (excluyendo hola@viven.es compartido)
        const existing = existingDocs.find(
          (docItem) =>
            docItem.uid === seed.uid ||
            (docItem.fullName &&
              docItem.fullName.trim().toLowerCase() === cleanSeedName) ||
            (cleanSeedEmail !== "hola@viven.es" &&
              docItem.email &&
              docItem.email.trim().toLowerCase() === cleanSeedEmail)
        );

        if (existing) {
          const existingAvatar =
            existing.avatarUrl && !existing.avatarUrl.startsWith("/team/")
              ? existing.avatarUrl
              : "";

          const mergedData: Omit<EmployeeProfile, "uid"> = {
            email: existing.email || seed.email,
            fullName: existing.fullName || seed.fullName,
            jobTitle: existing.jobTitle || seed.jobTitle,
            department: existing.department || seed.department,
            role: existing.role || seed.role,
            phone: existing.phone || seed.phone,
            whatsapp: existing.whatsapp || seed.whatsapp || "",
            linkedin: existing.linkedin || seed.linkedin || "",
            avatarUrl: existingAvatar,
            bio: existing.bio || seed.bio,
            languages:
              existing.languages && existing.languages.length > 0
                ? existing.languages
                : seed.languages,
            hobbies: existing.hobbies || [],
            galleryPhotos: existing.galleryPhotos || [],
            isPublic: existing.isPublic ?? true,
            order: existing.order ?? seed.order,
            updatedAt: new Date().toISOString(),
          };

          // Si el documento tenía un ID tipo "seed_*", lo reemplazamos por un ID alfanumérico nativo de Firestore
          if (existing.uid.startsWith("seed_") || existing.uid.startsWith("member_")) {
            const newDocRef = doc(collection(db, "employees"));
            await setDoc(newDocRef, { ...mergedData, uid: newDocRef.id });
            await deleteDoc(doc(db, "employees", existing.uid));
          } else {
            await setDoc(
              doc(db, "employees", existing.uid),
              { ...mergedData, uid: existing.uid },
              { merge: true }
            );
          }
          updatedCount++;
        } else {
          // Generar ID alfanumérico estándar de Firestore (20 caracteres)
          const newDocRef = doc(collection(db, "employees"));
          await setDoc(newDocRef, {
            ...seed,
            uid: newDocRef.id,
            updatedAt: new Date().toISOString(),
          });
          createdCount++;
        }
      }

      await fetchTeamData();
      showToast(
        `Migración completada: ${createdCount} creados y ${updatedCount} sincronizados en Firestore.`
      );
    } catch (err: any) {
      if (err?.code === "permission-denied") {
        setPermissionWarning(true);
        showToast("Permiso denegado en Firestore: actualiza la pestaña Rules en Firebase Console.");
      }
      console.error("Error migrando equipo:", err);
    } finally {
      setMigratingTeam(false);
    }
  };

  const handleOpenNewEmployeeModal = () => {
    const newDocRef = doc(collection(db, "employees"));
    setEditingEmployee({
      uid: newDocRef.id,
      email: "",
      fullName: "",
      role: "employee",
      department: "inmobiliaria",
      isPublic: true,
      order: employees.length + 1,
      jobTitle: "Agente asociado",
      phone: "",
      whatsapp: "",
      linkedin: "",
      avatarUrl: "",
      bio: "",
      languages: ["🇪🇸 Español"],
      hobbies: [],
      galleryPhotos: [],
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDeleteEmployee = async (uidToDelete: string) => {
    try {
      await deleteDoc(doc(db, "employees", uidToDelete));
      setEmployees((prev) => prev.filter((e) => e.uid !== uidToDelete));
      setEditingEmployee(null);
      showToast("Miembro eliminado de Firestore.");
    } catch (err) {
      console.error("Error eliminando miembro:", err);
    }
  };

  const handleSaveEmployeeEdit = async () => {
    if (!editingEmployee) return;
    setSavingEmployee(true);
    try {
      const ref = doc(db, "employees", editingEmployee.uid);
      const updatedPayload: EmployeeProfile = {
        uid: editingEmployee.uid,
        email: (editingEmployee.email || "hola@viven.es").trim().toLowerCase(),
        fullName: editingEmployee.fullName || "",
        jobTitle: editingEmployee.jobTitle || "",
        department: editingEmployee.department || "inmobiliaria",
        role: editingEmployee.role || "employee",
        phone: editingEmployee.phone || "",
        whatsapp: editingEmployee.whatsapp || "",
        linkedin: editingEmployee.linkedin || "",
        inmovillaId: editingEmployee.inmovillaId || "",
        avatarUrl: editingEmployee.avatarUrl || "",
        bio: editingEmployee.bio || "",
        languages: editingEmployee.languages || [],
        hobbies: editingEmployee.hobbies || [],
        galleryPhotos: editingEmployee.galleryPhotos || [],
        isPublic: editingEmployee.isPublic ?? true,
        order: Number(editingEmployee.order ?? 99),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(ref, updatedPayload, { merge: true });
      setEmployees((prev) => {
        const exists = prev.some((e) => e.uid === editingEmployee.uid);
        const list = exists
          ? prev.map((e) =>
              e.uid === editingEmployee.uid ? { ...e, ...updatedPayload } : e
            )
          : [...prev, updatedPayload];
        return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      });
      setEditingEmployee(null);
      showToast("Perfil del miembro guardado en Firestore.");
    } catch (err) {
      console.error("Error actualizando empleado:", err);
    } finally {
      setSavingEmployee(false);
    }
  };

  // --- Acciones Leads ---
  const handleUpdateLead = async (
    leadId: string,
    updates: Partial<LeadRecord>
  ) => {
    try {
      await updateDoc(doc(db, "leads", leadId), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, ...updates } : l))
      );
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null));
      }
      showToast("Lead actualizado.");
    } catch (err) {
      console.error("Error actualizando lead:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      await deleteDoc(doc(db, "leads", leadId));
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      showToast("Consulta eliminada.");
    } catch (err) {
      console.error("Error eliminando lead:", err);
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Omit<LeadRecord, "id"> = {
        name: newLeadForm.name,
        email: newLeadForm.email,
        phone: newLeadForm.phone,
        service: newLeadForm.service,
        propertyRef: newLeadForm.propertyRef || undefined,
        message: newLeadForm.message,
        source: newLeadForm.propertyRef ? "propiedad" : "contacto",
        status: "nuevo",
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "leads"), payload);
      setLeads((prev) => [{ ...payload, id: docRef.id }, ...prev]);
      setShowNewLeadModal(false);
      setNewLeadForm({
        name: "",
        email: "",
        phone: "",
        service: "compra",
        propertyRef: "",
        message: "",
      });
      showToast("Lead registrado correctamente.");
    } catch (err) {
      console.error("Error creando lead:", err);
    }
  };

  const filteredEmployees = useMemo(() => {
    const q = employeeSearch.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (e) =>
        e.fullName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.jobTitle?.toLowerCase().includes(q)
    );
  }, [employees, employeeSearch]);

  const totalEmployeePages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE)
  );

  const paginatedEmployees = useMemo(() => {
    const safePage = Math.min(employeePage, totalEmployeePages);
    const start = (safePage - 1) * EMPLOYEES_PER_PAGE;
    return filteredEmployees.slice(start, start + EMPLOYEES_PER_PAGE);
  }, [filteredEmployees, employeePage, totalEmployeePages]);

  const filteredLeads = useMemo(() => {
    if (leadFilterStatus === "all") return leads;
    return leads.filter((l) => l.status === leadFilterStatus);
  }, [leads, leadFilterStatus]);

  return (
    <div className="space-y-8">
      {/* Aviso si las reglas de Firestore bloquean lecturas/escrituras */}
      {permissionWarning && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <p className="font-bold">
            ⚠️ Faltan permisos en las Reglas de Firestore (Missing or insufficient permissions)
          </p>
          <p className="text-amber-800">
            Ve a <strong>Firebase Console → Firestore Database → Reglas (Rules)</strong> y pega las reglas indicadas en el archivo <code>README.md</code> para habilitar el acceso a <code>employees</code>, <code>settings</code> y <code>leads</code>.
          </p>
        </div>
      )}

      {/* Notificación flotante */}
      {feedbackBanner && (
        <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600" />
            <span>{feedbackBanner}</span>
          </div>
          <button
            onClick={() => setFeedbackBanner(null)}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Navegación de Pestañas de Dirección */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab("team")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "team"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Users size={15} />
          <span>Equipo & Accesos ({employees.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === "leads"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Inbox size={15} />
          <span>Leads & Contactos ({leads.length})</span>
          {leads.filter((l) => l.status === "nuevo").length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-red-600 text-white">
              {leads.filter((l) => l.status === "nuevo").length}
            </span>
          )}
        </button>
      </div>

      {/* ================= TAB 1: EQUIPO & ACCESOS ================= */}
      {activeTab === "team" && (
        <div className="">
          {/* KPIs rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Perfiles Registrados
              </span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {employees.length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Visibles en Web
              </span>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">
                {employees.filter((e) => e.isPublic !== false).length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Administradores
              </span>
              <p className="text-2xl font-extrabold text-red-600 mt-1">
                {employees.filter((e) => e.role === "admin").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Con Email Corporativo
              </span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {
                  employees.filter(
                    (e) => e.email && e.email.includes("@")
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Listado de miembros en Firestore a ancho completo */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Directorio de Empleados (Firestore)
                </h3>
                <p className="text-xs text-slate-500">
                  Gestiona cargos, permisos de administrador, visibilidad pública y datos de cada miembro.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowNewUserModal(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} /> Crear nuevo
                </button>
                <button
                  onClick={fetchTeamData}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  title="Recargar equipo"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

              {/* Buscador rápido de usuarios */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Buscar trabajador por nombre, correo o cargo..."
                  value={employeeSearch}
                  onChange={(e) => {
                    setEmployeeSearch(e.target.value);
                    setEmployeePage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {loadingTeam ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  Cargando equipo...
                </div>
              ) : filteredEmployees.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No se encontraron trabajadores con ese criterio.
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {paginatedEmployees.map((emp) => (
                      <div
                        key={emp.uid}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden">
                            {emp.avatarUrl ? (
                              <img
                                src={emp.avatarUrl}
                                alt={emp.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              (emp.fullName || emp.email || "V")
                                .charAt(0)
                                .toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-slate-900">
                                {emp.fullName || "Sin nombre"}
                              </span>
                              {emp.role === "admin" && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 rounded-full flex items-center gap-1">
                                  <ShieldCheck size={11} /> Admin
                                </span>
                              )}
                              {emp.isPublic === false ? (
                                <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-500 rounded-full flex items-center gap-1">
                                  <EyeOff size={10} /> Oculto en web
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1">
                                  <Eye size={10} /> Visible
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {emp.jobTitle || "Cargo sin asignar"} ·{" "}
                              <span className="text-slate-400">{emp.email}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => sendMagicLinkToEmployee(emp)}
                            disabled={sendingMagicLinkUid === emp.uid}
                            className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 transition flex items-center justify-center disabled:opacity-50"
                            title={`Enviar Magic Link por correo a ${emp.email}`}
                          >
                            <Send
                              size={15}
                              className={
                                sendingMagicLinkUid === emp.uid
                                  ? "animate-pulse"
                                  : ""
                              }
                            />
                          </button>
                          <button
                            onClick={() => onImpersonate(emp)}
                            className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 hover:border-indigo-600 transition flex items-center justify-center"
                            title={`Impersonar a ${emp.fullName}`}
                          >
                            <UserCheck size={15} />
                          </button>
                          <button
                            onClick={() => setEditingEmployee(emp)}
                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 border border-slate-200 hover:border-slate-900 transition flex items-center justify-center"
                            title={`Editar ficha de ${emp.fullName}`}
                          >
                            <Edit3 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controles de Paginación de Usuarios */}
                  {totalEmployeePages > 1 && (
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        Mostrando{" "}
                        <strong className="text-slate-700">
                          {(employeePage - 1) * EMPLOYEES_PER_PAGE + 1}–
                          {Math.min(
                            employeePage * EMPLOYEES_PER_PAGE,
                            filteredEmployees.length
                          )}
                        </strong>{" "}
                        de{" "}
                        <strong className="text-slate-700">
                          {filteredEmployees.length}
                        </strong>{" "}
                        usuarios
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={employeePage <= 1}
                          onClick={() =>
                            setEmployeePage((p) => Math.max(1, p - 1))
                          }
                          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronLeft size={15} />
                        </button>

                        {Array.from(
                          { length: totalEmployeePages },
                          (_, i) => i + 1
                        ).map((pageNum) => (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => setEmployeePage(pageNum)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                              employeePage === pageNum
                                ? "bg-blue-600 text-white shadow-xs"
                                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}

                        <button
                          type="button"
                          disabled={employeePage >= totalEmployeePages}
                          onClick={() =>
                            setEmployeePage((p) =>
                              Math.min(totalEmployeePages, p + 1)
                            )
                          }
                          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
          </div>

          {/* Modal: Crear Nuevo Usuario con Correo para acceso al BO */}
          {showNewUserModal && (
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center"
              onClick={() => setShowNewUserModal(false)}
            >
              <div
                className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-slate-200 shadow-2xl space-y-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                      Registro Privado
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Crear Nuevo Usuario (Acceso BO)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Crea aquí el perfil del trabajador con su correo para que pueda iniciar sesión en{" "}
                      <code className="text-blue-600">/admin</code> mediante{" "}
                      <strong>Acceder sin contraseña (Magic Link)</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewUserModal(false)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0"
                  >
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleCreateNewUserWithEmail} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Laura Martínez"
                      value={newUserForm.fullName}
                      onChange={(e) =>
                        setNewUserForm({ ...newUserForm, fullName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Correo Electrónico (Acceso BO) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="laura.martinez@remax.es"
                      value={newUserForm.email}
                      onChange={(e) =>
                        setNewUserForm({ ...newUserForm, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Cargo / Puesto
                    </label>
                    <input
                      type="text"
                      placeholder="Agente asociado"
                      value={newUserForm.jobTitle}
                      onChange={(e) =>
                        setNewUserForm({ ...newUserForm, jobTitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Departamento
                      </label>
                      <select
                        value={newUserForm.department}
                        onChange={(e) =>
                          setNewUserForm({
                            ...newUserForm,
                            department: e.target.value as EmployeeDepartment,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <option value="inmobiliaria">Inmobiliaria</option>
                        <option value="comunidades">Comunidades</option>
                        <option value="inversion">Inversión</option>
                        <option value="direccion">Dirección</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Rol en BO
                      </label>
                      <select
                        value={newUserForm.role}
                        onChange={(e) =>
                          setNewUserForm({
                            ...newUserForm,
                            role: e.target.value as EmployeeRole,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      >
                        <option value="employee">Empleado</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUserForm.isPublic}
                        onChange={(e) =>
                          setNewUserForm({
                            ...newUserForm,
                            isPublic: e.target.checked,
                          })
                        }
                        className="rounded text-blue-600"
                      />
                      <span>Mostrar en páginas públicas de equipo</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUserForm.sendMagicLink}
                        onChange={(e) =>
                          setNewUserForm({
                            ...newUserForm,
                            sendMagicLink: e.target.checked,
                          })
                        }
                        className="rounded text-blue-600"
                      />
                      <span>Enviar Magic Link de acceso a su correo ahora</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowNewUserModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={creatingUser}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 disabled:opacity-50"
                    >
                      <Plus size={15} />
                      <span>
                        {creatingUser
                          ? "Creando..."
                          : "Dar de Alta Usuario"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de Edición de Empleado por Dirección */}
          {editingEmployee && (
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              onClick={() => setEditingEmployee(null)}
            >
              <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Editar Miembro: {editingEmployee.fullName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      UID: {editingEmployee.uid} · {editingEmployee.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingEmployee(null)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={editingEmployee.fullName || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="agente@remax.es"
                      value={editingEmployee.email || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          email: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Cargo / Puesto (jobTitle)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Asesor Inmobiliario / CEO"
                      value={editingEmployee.jobTitle || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          jobTitle: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Rol en el Backoffice (role)
                    </label>
                    <select
                      value={editingEmployee.role || "employee"}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          role: e.target.value as EmployeeRole,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                    >
                      <option value="employee">Agente / Empleado (employee)</option>
                      <option value="admin">Dirección / Administrador (admin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Departamento
                    </label>
                    <select
                      value={editingEmployee.department || "inmobiliaria"}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          department: e.target.value as EmployeeDepartment,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    >
                      <option value="direccion">Dirección</option>
                      <option value="inmobiliaria">Inmobiliaria / RE/MAX</option>
                      <option value="comunidades">Comunidades</option>
                      <option value="inversion">Inversión</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Teléfono Público
                    </label>
                    <input
                      type="text"
                      placeholder="+34 600 000 000"
                      value={editingEmployee.phone || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      ID Agente Inmovilla (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 14205"
                      value={editingEmployee.inmovillaId || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          inmovillaId: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageDropzone
                      label="Foto de Perfil / Avatar"
                      multiple={false}
                      maxDimension={800}
                      currentSingleImage={editingEmployee.avatarUrl}
                      onClearSingleImage={() =>
                        setEditingEmployee({
                          ...editingEmployee,
                          avatarUrl: "",
                        })
                      }
                      onImagesAdded={(imgs) => {
                        if (imgs[0]) {
                          setEditingEmployee({
                            ...editingEmployee,
                            avatarUrl: imgs[0],
                          });
                        }
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      WhatsApp URL (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://wa.me/34600000000"
                      value={editingEmployee.whatsapp || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          whatsapp: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      LinkedIn URL (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.linkedin.com/in/..."
                      value={editingEmployee.linkedin || ""}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          linkedin: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Orden Web
                      </label>
                      <input
                        type="number"
                        value={editingEmployee.order ?? 99}
                        onChange={(e) =>
                          setEditingEmployee({
                            ...editingEmployee,
                            order: Number(e.target.value),
                          })
                        }
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                      />
                    </div>

                    <div className="flex flex-col justify-end">
                      <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={editingEmployee.isPublic !== false}
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              isPublic: e.target.checked,
                            })
                          }
                          className="rounded text-blue-600"
                        />
                        <span>Visible en Web</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Biografía
                  </label>
                  <textarea
                    rows={3}
                    value={editingEmployee.bio || ""}
                    onChange={(e) =>
                      setEditingEmployee({
                        ...editingEmployee,
                        bio: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  {editingEmployee.uid !== currentAdmin.uid ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteEmployee(editingEmployee.uid)}
                      className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingEmployee(null)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEmployeeEdit}
                      disabled={savingEmployee}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 disabled:opacity-50"
                    >
                      {savingEmployee ? "Guardando..." : "Guardar Cambios"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: LEADS & CONTACTOS ================= */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Bandeja de Entrada de Leads (Firestore)
              </h3>
              <p className="text-xs text-slate-500">
                Consultas recibidas desde el formulario de contacto general y desde las fichas de inmuebles.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "nuevo", "contactado", "en_seguimiento", "cerrado"] as const).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      leadFilterStatus === st
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st === "all"
                      ? "Todos"
                      : st === "en_seguimiento"
                      ? "En seguimiento"
                      : st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                )
              )}

              <button
                onClick={() => setShowNewLeadModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 ml-2"
              >
                <Plus size={14} /> Nuevo Lead
              </button>
            </div>
          </div>

          {loadingLeads ? (
            <div className="bg-white rounded-3xl p-12 text-center text-xs text-slate-400 border border-slate-200">
              Cargando consultas...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-2 border border-slate-200">
              <p className="text-sm font-bold text-slate-700">
                No hay consultas en este estado
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Cuando un visitante envíe un formulario en{" "}
                <code>/contacto</code> o en una ficha de{" "}
                <code>/propiedades/[id]</code>, aparecerá aquí automáticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-5 cursor-pointer transition hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      selectedLead?.id === lead.id ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">
                          {lead.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                            lead.status === "nuevo"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : lead.status === "contactado"
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : lead.status === "en_seguimiento"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {lead.status}
                        </span>
                        {lead.propertyRef && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                            Ref: {lead.propertyRef}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {lead.message}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>{lead.email}</span>
                        {lead.phone && <span>· {lead.phone}</span>}
                        {lead.service && <span>· Servicio: {lead.service}</span>}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 shrink-0">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detalle del Lead Seleccionado */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 h-fit space-y-5">
                {selectedLead ? (
                  <>
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">
                          {selectedLead.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Origen: {selectedLead.source}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteLead(selectedLead.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        title="Eliminar consulta"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
                      >
                        <Mail size={14} /> {selectedLead.email}
                      </a>
                      {selectedLead.phone && (
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="flex items-center gap-2 text-slate-700 font-medium hover:underline"
                        >
                          <Phone size={14} /> {selectedLead.phone}
                        </a>
                      )}
                      {selectedLead.propertyRef && (
                        <div className="flex items-center gap-2 text-slate-700 font-semibold pt-1">
                          <Building2 size={14} className="text-blue-600" />
                          <span>
                            Inmueble Ref: {selectedLead.propertyRef}{" "}
                            {selectedLead.propertyTitle
                              ? `(${selectedLead.propertyTitle})`
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 whitespace-pre-line">
                      {selectedLead.message}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                        Cambiar Estado
                      </label>
                      <select
                        value={selectedLead.status}
                        onChange={(e) =>
                          handleUpdateLead(selectedLead.id, {
                            status: e.target.value as LeadStatus,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                      >
                        <option value="nuevo">Nuevo</option>
                        <option value="contactado">Contactado</option>
                        <option value="en_seguimiento">En seguimiento</option>
                        <option value="cerrado">Cerrado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                        Asignar a Agente
                      </label>
                      <select
                        value={selectedLead.assignedAgentEmail || ""}
                        onChange={(e) =>
                          handleUpdateLead(selectedLead.id, {
                            assignedAgentEmail: e.target.value,
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <option value="">Sin asignar</option>
                        {employees.map((emp) => (
                          <option key={emp.uid} value={emp.email}>
                            {emp.fullName} ({emp.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                        Notas Internas
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Añade notas de seguimiento..."
                        value={selectedLead.notes || ""}
                        onChange={(e) =>
                          setSelectedLead({
                            ...selectedLead,
                            notes: e.target.value,
                          })
                        }
                        onBlur={() =>
                          handleUpdateLead(selectedLead.id, {
                            notes: selectedLead.notes || "",
                          })
                        }
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-8">
                    Selecciona una consulta de la lista para ver sus detalles y gestionarla.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Modal Crear Lead Manual */}
          {showNewLeadModal && (
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
              onClick={() => setShowNewLeadModal(false)}
            >
              <form
                onSubmit={handleCreateManualLead}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-900">
                    Registrar Lead Manual
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowNewLeadModal(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                <input
                  type="text"
                  required
                  placeholder="Nombre del cliente *"
                  value={newLeadForm.name}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, name: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="Correo electrónico *"
                  value={newLeadForm.email}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, email: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={newLeadForm.phone}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, phone: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Ref. Inmueble (opc.)"
                    value={newLeadForm.propertyRef}
                    onChange={(e) =>
                      setNewLeadForm({
                        ...newLeadForm,
                        propertyRef: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Mensaje o detalles de la consulta *"
                  value={newLeadForm.message}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, message: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewLeadModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Guardar Lead
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
