import SectionHeader from "@/components/sectionHeader"
import DasboardLayout from "@/layouts/dashboard"
import { APP_STATUS, useStepsStore } from "@/stores/useStepsStore"

import ErrorStep from "@/components/excel-load/error-step"
import LoadingStep from "@/components/excel-load/loading-step"
import SuccessStep from "@/components/excel-load/success-step"
import UploadStep from "@/components/excel-load/upload-step"

export default function DashboardExcel() {
  const { status } = useStepsStore()

  return (
    <DasboardLayout>
      <SectionHeader
        title='Carga masiva de eventos'
        subtitle='Sube un archivo .xlsx con los eventos que deseas cargar, el archivo debe tener el formato correcto para que la carga sea exitosa. Debe contener las columnas: nombre, fecha, lugar, tipo de evento, eje temático, descripción, imagen, y url.'
      />

      <div className='flex justify-center items-center rounded-xl backdrop-blur-[1px] flex-1'>
        {status === APP_STATUS.UPLOAD && <UploadStep />}
        {status === APP_STATUS.LOADING && <LoadingStep />}
        {status === APP_STATUS.SUCCESS && <SuccessStep />}
        {status === APP_STATUS.ERROR && <ErrorStep />}
      </div>
    </DasboardLayout>
  )
}
