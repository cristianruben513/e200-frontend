import SectionHeader from "@/components/sectionHeader"
import DasboardLayout from "@/layouts/dashboard"
import { APP_STATUS, useStepsStore } from "@/stores/useStepsStore"

import ErrorStep from "@/components/uploadSteps/error-step"
import LoadingStep from "@/components/uploadSteps/loading-step"
import SuccessStep from "@/components/uploadSteps/success-step"
import UploadStep from "@/components/uploadSteps/upload-step"

export default function DashboardContactosRegistroMasivo() {
  const { status } = useStepsStore()

  return (
    <DasboardLayout>
      <SectionHeader
        title='Carga masiva de contactos'
        subtitle='Sube un archivo .csv con los contactos que deseas registrar'
      />

      <div className='flex justify-center items-center rounded-xl backdrop-blur-[1px] flex-1'>
        {status === APP_STATUS.UPLOAD && (
          <UploadStep
            endpoint='/contactos/carga-masiva'
            titleLabel='Carga masiva de contactos'
          />
        )}
        {status === APP_STATUS.LOADING && <LoadingStep />}
        {status === APP_STATUS.SUCCESS && (
          <SuccessStep
            successMessage='Contactos cargados correctamente'
            successButtonText='Ver contactos'
          />
        )}
        {status === APP_STATUS.ERROR && <ErrorStep />}
      </div>
    </DasboardLayout>
  )
}
