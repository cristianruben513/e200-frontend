interface FiltroDistritoLocalProps {
  distritosLocales: number[]
  distritoLocalSeleccionado: number | null
  onDistritoLocalChange: (distrito: number | null) => void
}

export default function FiltroDistritoLocal({
  distritosLocales,
  distritoLocalSeleccionado,
  onDistritoLocalChange,
}: FiltroDistritoLocalProps) {
  return (
    <div>
      <label
        htmlFor='distrito-local-select'
        className='block text-sm font-medium text-gray-700'
      >
        Filtrar por distrito local:
      </label>
      <select
        id='distrito-local-select'
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        value={distritoLocalSeleccionado || ""}
        onChange={(e) => {
          onDistritoLocalChange(Number(e.target.value) || null)
        }}
      >
        <option value=''>Todos los distritos locales</option>
        {distritosLocales.map((distrito, index) => (
          <option key={index} value={distrito}>
            Distrito {distrito}
          </option>
        ))}
      </select>
    </div>
  )
}
