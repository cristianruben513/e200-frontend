import axiosInstance from "@/axiosInstance"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  setAppStatusError,
  setAppStatusLoading,
  setAppStatusSuccess,
} from "@/stores/useStepsStore"
import { FileSpreadsheetIcon, UploadCloud } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function UploadStep() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setAppStatusLoading()

      const formData = new FormData()
      formData.append("file", acceptedFiles[0])

      const res = await axiosInstance.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 201) {
        setAppStatusSuccess()
      } else {
        setAppStatusError("Failed to process the file.")
      }
    } catch {
      setAppStatusError("An unexpected error occurred.")
    }
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragReject,
  } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
  })

  return (
    <form className='w-full relative' onSubmit={handleSubmit}>
      <div
        className={cn(
          "p-10 w-full h-48 py-6 border-4 border-dotted bg-white/60 backdrop-blur-lg  rounded-xl flex flex-col gap-3 justify-center items-center cursor-pointer transition-transform duration-300",
          !isDragActive && "border-neutral-400/80 hover:bg-neutral-200/60",
          isDragActive && "border-purple-400 bg-purple-100/80",
          isDragReject && "border-red-500 bg-red-100"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <UploadCloud
          className='text-neutral-500/70 absolute top-3 left-3'
          size={34}
        />

        <div className={cn("flex items-center gap-2 font-bold")}>
          <FileSpreadsheetIcon className='size-5' />
          <span>Registro masivo de eventos</span>
        </div>

        {!isDragActive && (
          <p className='text-center text-xs opacity-60'>
            Suelta y arrastra tu archivo .csv
          </p>
        )}

        {isDragActive && !isDragReject && (
          <p className='text-center text-sm opacity-60'>
            Suelta tu archivo aquí
          </p>
        )}

        {isDragReject && (
          <>
            <p className='text-center text-sm font-bold text-red-500'>
              FORMATO DE ARCHIVO NO SOPORTADO
            </p>
            <p className='text-center text-sm opacity-90 text-red-500'>
              Solo se acepan archivos en formato .csv
            </p>
          </>
        )}
      </div>

      {acceptedFiles.length > 0 && (
        <div className='w-full bg-gradient-to-tr from-green-50 to-emerald-100 rounded-xl my-3 p-4 flex items-center justify-center gap-2 overflow-hidden border-2 border-green-300 text-green-700'>
          <FileSpreadsheetIcon className='size-5' />
          <span className='font-bold'>{acceptedFiles[0].name}</span>
        </div>
      )}

      <Button
        className='w-full mt-4 rounded-xl border-2 border-neutral-500'
        type='submit'
        disabled={acceptedFiles.length === 0}
      >
        Cargar archivo
      </Button>
    </form>
  )
}
