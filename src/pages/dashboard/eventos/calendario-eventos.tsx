import { Evento } from "@/types/evento.interface"
import dayjs from "dayjs"
import { Calendar, dayjsLocalizer } from "react-big-calendar"

import "react-big-calendar/lib/css/react-big-calendar.css"

export default function CalendarioEventos({ eventos }: { eventos: Evento[] }) {
  const localizer = dayjsLocalizer(dayjs)

  // Mapea los eventos al formato de react-big-calendar
  const eventosMapeados = eventos.map((evento) => ({
    id: evento.id,
    title: `${evento.evento}`,
    start: new Date(`${evento.fechaInicio}T${evento.horaInicio}`),
    end: evento.fechaFin
      ? new Date(`${evento.fechaFin}T${evento.horaFin}`)
      : new Date(`${evento.fechaInicio}T${evento.horaInicio}`),
    description: evento.descripcion,
  }))

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventosMapeados}
        startAccessor='start'
        endAccessor='end'
        titleAccessor='title'
        style={{ height: 500, width: "100%" }}
      />
    </div>
  )
}
