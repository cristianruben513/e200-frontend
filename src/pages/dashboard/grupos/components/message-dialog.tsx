import axiosInstance from "@/axiosInstance"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizonal } from "lucide-react"
import { useState } from "react"
import { IoLogoWhatsapp } from "react-icons/io5"
import { LoaderIcon } from "lucide-react"
import { toast } from "sonner"

export default function MessageDialog({ celulares }: { celulares: string[] }) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    try {
      setLoading(true)
      await axiosInstance.post(`/whatsapp/send`, {
        numeros: celulares,
        mensaje: text,
      })

      toast.success("Mensaje enviado")
    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error("Algo salió mal")
    } finally {
      setLoading(false)
      setText("")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <IoLogoWhatsapp className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enviar mensaje a grupo</AlertDialogTitle>
          <AlertDialogDescription>
            Escribe un mensaje para enviar a los miembros del grupo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex w-full my-6'>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Escribe un mensaje'
            className='w-full bg-neutral-100'
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>

          <Button onClick={sendMessage} disabled={text.length === 0 || loading}>
            Enviar Mensaje
            {loading && <LoaderIcon className='size-4 ml-2 animate-spin' />}
            {!loading && <SendHorizonal className='size-4 ml-2' />}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
