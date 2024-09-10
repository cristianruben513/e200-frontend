import { mapearEventos } from "@/lib/mapearEventosRBC"
import { Evento } from "@/types/evento.interface"
import dayjs from "dayjs"
import { Calendar, dayjsLocalizer } from "react-big-calendar"

import "dayjs/locale/es"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar.css"
import { useNavigate } from "react-router-dom"

export default function CalendarioEventos({ eventos }: { eventos: Evento[] }) {
  dayjs.locale("es")
  const localizer = dayjsLocalizer(dayjs)

  const navigate = useNavigate()

  // Mapea los eventos al formato de react-big-calendar
  const eventosMapeados = mapearEventos(eventos)

  return (
    <div className="bg-neutral-100 p-4 rounded-xl">
      <Calendar
        localizer={localizer}
        events={eventosMapeados}
        startAccessor='start'
        endAccessor='end'
        titleAccessor='title'
        style={{ height: 500, width: "100%" }}
        onSelectEvent={(evento) => {
          navigate(`/dashboard/eventos/${evento.id}`)
        }}
        views={["month"]}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango",
          showMore: (total) => `+ Ver más (${total})`,
        }}
      />
    </div>
  )
}
