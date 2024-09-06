export function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
  styles?: string
}) {
  return (
    <div className='p-2 px-4 rounded-xl bg-neutral-100 grid gap-1'>
      <span className='font-bold text-lg'>{title}</span>
      <span>{children}</span>
    </div>
  )
}
