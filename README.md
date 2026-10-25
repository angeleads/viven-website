# Viven Inmobiliaria & Administración de Fincas — Web & Backoffice

Plataforma web corporativa, escaparate inmobiliario conectado en tiempo real con **Inmovilla CRM** y **Backoffice interno** (Dirección y Empleados) respaldado por **Firebase Firestore** y **EmailJS**.

---

## 1. Arquitectura General

* **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
* **Internacionalización (`i18n`):** `next-intl` con soporte para 4 idiomas (`es`, `ca`, `en`, `fr`) en `messages/*.json`.
* **Inmuebles (CRM):** Integración con API Web de Inmovilla (`lib/inmovilla.ts`, `lib/format-property.ts`) a través de proxy estático (`FIXIE_URL`) y caché en memoria con invalidación bajo demanda (`POST /api/properties`).
* **Base de Datos y Autenticación:** Firebase Auth y Cloud Firestore (`lib/firebase.ts`) + acceso sin contraseña mediante **Magic Link** enviado por **EmailJS**.
* **Notificaciones por Correo:** EmailJS (`@emailjs/browser`) + respaldo automático en Firestore (`leads`).

---

## 2. Acceso al Backoffice (`/admin`) y Alta de Usuarios (Sin Registro Público)

El registro público en `/admin` está **completamente cerrado**. Solo pueden acceder al Backoffice los usuarios que hayan sido dados de alta previamente en la colección `employees` de Firestore por un Administrador:

1. **Alta por el Administrador (`Vista Dirección → Equipo & Accesos`):**
   * En la columna derecha (**"Crear Nuevo Usuario (Acceso BO)"**), el Admin introduce el **Nombre**, **Correo Electrónico**, **Cargo**, **Departamento** y **Rol (`employee` o `admin`)**.
   * Al pulsar **"Dar de Alta Usuario en Firestore"**, se crea su documento en `employees` con un ID alfanumérico nativo de Firestore y, si la casilla está marcada, se le envía automáticamente un **Magic Link** a su correo.
2. **Inicio de Sesión sin Contraseña (`Acceder sin contraseña` en `/admin`):**
   * El empleado entra en `/admin`, selecciona la pestaña **"Sin contraseña"**, e introduce su correo corporativo.
   * El sistema verifica en tiempo real que ese correo exista en la colección `employees` de Firestore.
   * Si existe, genera un token único de un solo uso (`magicToken`, válido durante 30 minutos) y envía un correo mediante **EmailJS** con el enlace mágico (`/admin?magic_token=...&uid=...`).
   * Al abrir el enlace del correo, el sistema valida y consume el token e inicia sesión directamente en `/admin/dashboard`.

---

## 3. Configuración de EmailJS para el Magic Link

Para que el envío del **Magic Link** funcione en `/admin` y al crear usuarios desde el Backoffice, sigue estos pasos en tu cuenta de [EmailJS](https://dashboard.emailjs.com/):

### Paso 1: Crear una plantilla (Email Template) en EmailJS
1. Ve a **Email Templates → Create New Template**.
2. En la pestaña **Settings** o en el campo **To Email** (Destinatario) de la derecha:
   * Pon como destinatario dinámico: `{{to_email}}` *(¡Muy importante! Así el correo se envía al email del empleado que intenta iniciar sesión y no a un correo fijo).*
3. En **Subject (Asunto)** pon:
   * `Tu enlace de acceso al Backoffice de Viven` (o `{{subject}}`)
4. En **Content (Cuerpo del mensaje)** pulsa en el icono **`<>` (Source code / Edit HTML)** del editor de EmailJS y pega este HTML clásico y sobrio (sin sombras ni degradados, siguiendo la línea editorial de la web) que usa `{{to_name}}`, `{{to_email}}` y `{{magic_link}}`:
   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Acceso al Backoffice — Viven</title>
   </head>
   <body style="margin:0;padding:0;background-color:#f9fafb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111827;-webkit-font-smoothing:antialiased;">
     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f9fafb;padding:48px 16px;">
       <tr>
         <td align="center">
           <!-- Contenedor Principal (Sin sombras, borde limpio) -->
           <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e5e7eb;">
             
             <!-- Cabecera Sobria -->
             <tr>
               <td style="padding:32px 40px 24px 40px;border-bottom:1px solid #e5e7eb;">
                 <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                   <tr>
                     <td align="left">
                       <span style="font-size:18px;font-weight:700;letter-spacing:2px;color:#111827;text-transform:uppercase;">
                         VIVEN
                       </span>
                       <span style="font-size:11px;color:#6b7280;letter-spacing:1px;text-transform:uppercase;margin-left:8px;">
                         Inmobiliaria &amp; Fincas
                       </span>
                     </td>
                     <td align="right">
                       <span style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">
                         Backoffice
                       </span>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>

             <!-- Cuerpo del Mensaje -->
             <tr>
               <td style="padding:40px;">
                 <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#1d4ed8;">
                   Solicitud de acceso
                 </p>
                 <h1 style="margin:0 0 24px 0;font-size:22px;font-weight:600;color:#111827;line-height:1.3;">
                   Iniciar sesión en tu cuenta
                 </h1>

                 <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#374151;">
                   Hola, <strong>{{to_name}}</strong>:
                 </p>
                 <p style="margin:0 0 28px 0;font-size:15px;line-height:1.6;color:#374151;">
                   Has solicitado acceder al portal interno de Viven con el correo <strong>{{to_email}}</strong>. Pulsa en el siguiente botón para entrar directamente a tu panel sin necesidad de introducir contraseña:
                 </p>

                 <!-- Botón Clásico -->
                 <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 32px 0;">
                   <tr>
                     <td align="left" bgcolor="#111827">
                       <a href="{{magic_link}}" target="_blank" style="display:inline-block;padding:14px 28px;background-color:#111827;color:#ffffff;font-size:13px;font-weight:600;letter-spacing:0.5px;text-decoration:none;text-transform:uppercase;">
                         Acceder al panel
                       </a>
                     </td>
                   </tr>
                 </table>

                 <p style="margin:0 0 24px 0;font-size:13px;line-height:1.6;color:#6b7280;">
                   Este enlace es personal, de un solo uso y tiene una validez de 30 minutos. Si no has solicitado este correo, puedes ignorarlo.
                 </p>

                 <!-- Separador y URL plana -->
                 <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #f3f4f6;padding-top:20px;">
                   <tr>
                     <td>
                       <p style="margin:0 0 6px 0;font-size:12px;color:#9ca3af;">
                         Si tienes problemas con el botón, copia y pega la siguiente dirección en tu navegador:
                       </p>
                       <p style="margin:0;font-size:12px;line-height:1.5;word-break:break-all;color:#4b5563;">
                         {{magic_link}}
                       </p>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>

             <!-- Pie de página -->
             <tr>
               <td style="padding:24px 40px;background-color:#f9fafb;border-top:1px solid #e5e7eb;">
                 <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">
                   © Viven Inmobiliaria. Todos los derechos reservados.<br />
                   Vilanova i la Geltrú · Sitges · Barcelona
                 </p>
               </td>
             </tr>

           </table>
         </td>
       </tr>
     </table>
   </body>
   </html>
   ```
5. Guarda la plantilla y copia su **Template ID** (ej. `template_xxxxxxx`).

### Paso 2: Añadir la variable en `.env.local`
En tu archivo `.env.local` (y en las variables de entorno de Vercel), añade el ID de la nueva plantilla:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_de_contacto
NEXT_PUBLIC_EMAILJS_MAGICLINK_TEMPLATE_ID=tu_template_id_de_magiclink
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```
*(Si no defines `NEXT_PUBLIC_EMAILJS_MAGICLINK_TEMPLATE_ID`, usará `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` por defecto).*

---

## 4. Cómo activar el Rol de Administrador (Dirección) en Firebase

Para que un usuario tenga acceso a la **Vista Dirección (Admin)** en `/admin/dashboard`:

1. Abre **Firebase Console → Firestore Database**.
2. Entra en la colección **`employees`**.
3. Localiza el documento del usuario (puedes identificarlo viendo el campo `email` o `fullName`).
4. Añade o edita el siguiente campo dentro del documento:
   * **Campo:** `role`
   * **Tipo:** `string`
   * **Valor:** `admin`

---

## 5. Estructura de Colecciones en Firestore

### 5.1. Colección `employees` (`employees/{uid}`)
Almacena el perfil de cada miembro del equipo (ningún avatar ni empleado está hardcodeado en la web pública; todo se lee de Firestore):

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `uid` | `string` | ID alfanumérico nativo de Firestore (20 caracteres) |
| `email` | `string` | Correo electrónico del trabajador para acceder al Backoffice |
| `fullName` | `string` | Nombre y apellidos |
| `role` | `"admin"` \| `"employee"` | Nivel de acceso en `/admin/dashboard` |
| `department` | `"direccion"` \| `"inmobiliaria"` \| `"comunidades"` \| `"inversion"` | Línea de negocio a la que pertenece |
| `jobTitle` | `string` | Cargo público (ej. *Broker - CEO VIVEN*, *Agente asociado*) |
| `isPublic` | `boolean` | Si es `true`, aparece en las páginas públicas `/empresa` e `/inversion` |
| `order` | `number` | Orden numérico de aparición en la web (menor número = aparece antes) |
| `phone` | `string` | Teléfono de contacto público |
| `whatsapp` | `string` | Enlace directo a WhatsApp (`https://wa.me/...`) |
| `linkedin` | `string` | URL del perfil de LinkedIn |
| `inmovillaId` | `string` | ID opcional del agente en Inmovilla CRM |
| `avatarUrl` | `string` | Imagen en Base64/WebP subida con Drag & Drop y guardada en Firestore |
| `bio` | `string` | Descripción / biografía pública |
| `languages` | `string[]` | Lista de idiomas seleccionados |
| `hobbies` | `string[]` | Lista de aficiones del empleado |
| `galleryPhotos` | `string[]` | Galería adicional de imágenes subida con Drag & Drop |
| `magicToken` | `string` | Token temporal de un solo uso para inicio de sesión con Magic Link |
| `magicTokenExpiresAt` | `string` | Fecha ISO de expiración del Magic Link (30 min) |
| `updatedAt` | `string` | Fecha ISO de última modificación |

### 5.2. Colección `leads` (`leads/{leadId}`)
Registra automáticamente todas las consultas enviadas desde `/contacto` y desde las fichas de propiedades `/propiedades/[id]`.

---

## 6. Reglas Recomendadas de Firestore (`Firestore Rules`)

Para que funcione tanto el acceso con contraseña como el acceso sin contraseña (**Magic Link**), actualiza las reglas en **Firebase Console → Firestore Database → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Perfiles de empleados: lectura y actualización habilitadas para Web Pública y sesión con Magic Link
    match /employees/{empId} {
      allow read, write: if true;
    }

    // Configuración de migración:
    match /settings/{docId} {
      allow read, write: if true;
    }

    // Leads / Consultas:
    match /leads/{leadId} {
      allow read, write: if true;
    }
  }
}
```
