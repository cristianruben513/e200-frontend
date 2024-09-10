import { Promotor } from "@/types/promotor.interface"

interface FiltroPromotorProps {
  promotores: Promotor[]
  promotorSeleccionado: Promotor | null
  onPromotorChange: (promotor: Promotor | null) => void
}

export default function FiltroPromotor({
  promotores,
  promotorSeleccionado,
  onPromotorChange,
}: FiltroPromotorProps) {
  return (
    <div className='mb-4'>
      <label
        htmlFor='promotor-select'
        className='block text-sm font-medium text-gray-700'
      >
        Filtrar por promotor:
      </label>
      <select
        id='promotor-select'
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        value={promotorSeleccionado?.id || ""}
        onChange={(e) => {
          const selectedId = Number(e.target.value)
          const selectedPromotor =
            promotores.find((promotor) => promotor.id === selectedId) || null
          onPromotorChange(selectedPromotor)
        }}
      >
        <option value=''>Todos los promotores</option>
        {promotores.map((promotor) => (
          <option key={promotor.id} value={promotor.id}>
            {promotor.nombre}
          </option>
        ))}
      </select>
    </div>
  )
}
