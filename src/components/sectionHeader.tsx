interface SectionHeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function SectionHeader({
  title,
  subtitle,
  children,
}: SectionHeaderProps) {
  return (
    <div className='flex flex-col md:flex-row md:items-center justify-between'>
      <h2 className='text-xl font-bold mb-8'>{title}</h2>
      {subtitle && <p className='text-neutral-500'>{subtitle}</p>}

      <div className='p-4 bg-neutral-100 rounded-xl'>{children}</div>
    </div>
  )
}
