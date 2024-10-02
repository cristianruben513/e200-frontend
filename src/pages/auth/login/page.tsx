import AuthLayout from "@/layouts/auth"
import LoginForm from "./form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className='flex w-full flex-col justify-center space-y-6 lg:p-8 md:border border-neutral-300 rounded-xl md:p-4 md:mx-16 max-w-lg bg-white'>
        <div className='grid gap-5 py-10 md:py-0 p-6'>
          <h1 className='text-3xl md:text-4xl'>
            Iniciar sesion
          </h1>

          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  )
}
