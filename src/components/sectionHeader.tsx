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
    <div className='flex flex-col justify-between md:mt-2 md:mb-8 mb-5'>
      <div className='flex flex-col md:flex-row md:items-center justify-between'>
        <h2 className='text-xl font-bold'>{title}</h2>

        {children && (
          <div className='p-4 mt-4 bg-neutral-100 rounded-xl'>{children}</div>
        )}
      </div>

      {subtitle && (
        <p className='text-neutral-500 leading-8 mt-4'>{subtitle}</p>
      )}
    </div>
  )
}
