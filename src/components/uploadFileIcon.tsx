import { UploadCloud } from "lucide-react";

export const uploadFileContainer = "flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 border-dashed rounded-md cursor-pointer bg-almond-100/50 hover:bg-neutral-100"

export function UploadFileIcon() {
  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <UploadCloud className="w-12 h-12 text-gray-400" />
      <p className="my-2 text-sm text-neutral-500 font-light">
        Subir Imagen
      </p>
    </div>
  )
}