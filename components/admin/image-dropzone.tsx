"use client";

import { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, Trash2 } from "lucide-react";

interface ImageDropzoneProps {
  label?: string;
  helperText?: string;
  multiple?: boolean;
  maxDimension?: number;
  quality?: number;
  onImagesAdded: (dataUrls: string[]) => void;
  currentSingleImage?: string;
  onClearSingleImage?: () => void;
}

/**
 * Comprime y redimensiona un archivo de imagen en el navegador a WebP/JPEG ligero
 * para guardarlo de forma instantánea y fiable en Firestore.
 */
async function compressImageFile(
  file: File,
  maxDimension = 900,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Formato de imagen no válido."));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const webpDataUrl = canvas.toDataURL("image/webp", quality);
        if (webpDataUrl.startsWith("data:image/webp")) {
          resolve(webpDataUrl);
        } else {
          resolve(canvas.toDataURL("image/jpeg", quality));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageDropzone({
  label,
  helperText = "Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar desde tu equipo (JPG, PNG, WEBP)",
  multiple = false,
  maxDimension = 900,
  quality = 0.82,
  onImagesAdded,
  currentSingleImage,
  onClearSingleImage,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );

    if (files.length === 0) {
      setError("Por favor, selecciona archivos de imagen válidos (JPG, PNG, WEBP).");
      return;
    }

    setError(null);
    setProcessing(true);

    try {
      const targetFiles = multiple ? files : [files[0]];
      const results: string[] = [];
      for (const file of targetFiles) {
        const compressed = await compressImageFile(file, maxDimension, quality);
        results.push(compressed);
      }
      onImagesAdded(results);
    } catch (err: any) {
      console.error("Error procesando imagen:", err);
      setError(err.message || "Error al procesar la imagen.");
    } finally {
      setProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
      return;
    }

    // Soporte si arrastran una imagen directamente desde otra pestaña/web
    const droppedUrl =
      e.dataTransfer.getData("text/uri-list") ||
      e.dataTransfer.getData("text/plain");
    if (
      droppedUrl &&
      (droppedUrl.startsWith("http") || droppedUrl.startsWith("/"))
    ) {
      setError(null);
      onImagesAdded([droppedUrl.trim()]);
    }
  };

  return (
    <div className="space-y-2.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row items-stretch gap-4">
        {/* Vista previa cuando es modo imagen única (ej. Avatar / Foto de perfil) */}
        {!multiple && currentSingleImage && (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 group self-center sm:self-auto">
            <img
              src={currentSingleImage}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
            {onClearSingleImage && (
              <button
                type="button"
                onClick={onClearSingleImage}
                className="absolute inset-0 bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                title="Quitar foto"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}

        {/* Zona Drag & Drop */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 cursor-pointer rounded-2xl border-2 border-dashed p-5 transition-all flex flex-col items-center justify-center text-center gap-2 ${
            isDragging
              ? "border-blue-600 bg-blue-50/70 scale-[0.99]"
              : "border-slate-300 bg-slate-50/70 hover:bg-slate-100/80 hover:border-blue-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFiles(e.target.files);
              }
            }}
            className="hidden"
          />

          {processing ? (
            <div className="flex items-center gap-2 text-blue-600 py-2">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-xs font-bold">
                Optimizando y cargando imagen...
              </span>
            </div>
          ) : (
            <>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                  isDragging
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 shadow-xs border border-slate-200"
                }`}
              >
                {multiple ? <UploadCloud size={20} /> : <ImageIcon size={20} />}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800">
                  {isDragging
                    ? "¡Suelta la imagen aquí!"
                    : multiple
                    ? "Arrastra y suelta fotos aquí o haz clic para subir"
                    : "Arrastra la foto de perfil aquí o haz clic para cambiarla"}
                </p>
                <p className="text-[11px] text-slate-400">{helperText}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}
