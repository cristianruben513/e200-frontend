import AuthLayout from "@/layouts/auth"
import LoginForm from "./form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 lg:p-8 md:border border-neutral-300 rounded-xl md:p-4 md:mx-16 max-w-lg bg-white'>
        <div className='flex flex-col space-y-2  md:p-0 px-6'>
          <h1 className='text-3xl md:text-4xl font-bold sm:my-5 my-5'>
            Iniciar sesion
          </h1>

          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  )
}
