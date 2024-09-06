import { LoaderIcon } from "lucide-react"

export default function Loader() {
  return (
    <div className='flex justify-center items-center h-[80dvh]'>
      <LoaderIcon size='32' className='animate-spin' />
    </div>
  )
}
