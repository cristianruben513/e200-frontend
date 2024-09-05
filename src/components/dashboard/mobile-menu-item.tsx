import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  currentPathname: string
  href: string
  children: React.ReactNode
}

export function MobileMenuItem({ currentPathname, href, children }: LinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        buttonVariants({
          variant: currentPathname === href ? "secondary" : "outline",
        }),
        "w-full justify-start"
      )}
    >
      {children}
    </Link>
  )
}
