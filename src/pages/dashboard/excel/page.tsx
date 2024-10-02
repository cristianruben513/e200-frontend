import SectionHeader from "@/components/sectionHeader"
import DasboardLayout from "@/layouts/dashboard"
import { APP_STATUS, useStepsStore } from "@/stores/useStepsStore"

import ErrorStep from "@/pages/dashboard/excel/steps/error-step"
import LoadingStep from "@/pages/dashboard/excel/steps/loading-step"
import SuccessStep from "@/pages/dashboard/excel/steps/success-step"
import UploadStep from "@/pages/dashboard/excel/steps/upload-step"

export default function DashboardExcel() {
  const { status } = useStepsStore()

  return (
    <DasboardLayout>
      <SectionHeader
        title='Carga masiva de eventos'
        subtitle='Sube un archivo .xlsx con los eventos que deseas cargar, el archivo debe tener el formato correcto para que la carga sea exitosa.'
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
