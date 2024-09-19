import { links, type Link } from "@/components/dashboard/links"

// Filtrar enlaces según el perfil del usuario
export function filterLinksByProfile(links: Link[], userPerfil: string) {
  return links.filter(
    (link) =>
      userPerfil === "Administrador" ||
      (userPerfil === "Supervisor" && link.perfil !== "Administrador") ||
      (userPerfil === "Staff" && link.perfil === "Staff")
  )
}

// Agrupar enlaces por categoría
export function groupLinksByCategory(filteredLinks: typeof links) {
  return filteredLinks.reduce((acc: Record<string, typeof links>, link) => {
    if (!acc[link.categoria]) {
      acc[link.categoria] = []
    }
    acc[link.categoria].push(link)
    return acc
  }, {})
}
