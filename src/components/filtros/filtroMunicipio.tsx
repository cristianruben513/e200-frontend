interface FiltroMunicipioProps {
  municipios: string[]
  municipioSeleccionado: string | null
  onMunicipioChange: (municipio: string | null) => void
}

export default function FiltroMunicipio({
  municipios,
  municipioSeleccionado,
  onMunicipioChange,
}: FiltroMunicipioProps) {
  return (
    <div>
      <label
        htmlFor='municipio-select'
        className='block text-sm font-medium text-gray-700'
      >
        Filtrar por municipio:
      </label>
      <select
        id='municipio-select'
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        value={municipioSeleccionado || ""}
        onChange={(e) => {
          onMunicipioChange(e.target.value || null)
        }}
      >
        <option value=''>Todos los municipios</option>
        {municipios.map((municipio, index) => (
          <option key={index} value={municipio}>
            {municipio}
          </option>
        ))}
      </select>
    </div>
  )
}
