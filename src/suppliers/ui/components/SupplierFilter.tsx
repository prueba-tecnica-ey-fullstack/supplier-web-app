import CrossIcon from '@/common/ui/assets/icons/CrossIcon'
import { TableColumns } from '@/suppliers/domain/supplier.interface'
import { useSearchParams } from 'react-router-dom'


const SupplierFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const columnsFiltered = TableColumns.filter(column => (column.filterable))

  const actualParams = Array.from(searchParams.entries())
    .filter(([key]) => key !== 'sort' && key !== 'order')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { currentTarget: form } = event
    const formData = new FormData(form)

    const value = String(formData.get('value')).toLowerCase()
    const key = String(formData.get('key'))

    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.set(key, value)

    setSearchParams(updatedParams, { replace: true })

    form.reset()
  }

  const onRemoveParam = (key: string) => () => {
    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.delete(key)

    setSearchParams(updatedParams, { replace: true })
  }


  return (
    <>
      <search>
        <form
          onSubmit={onSubmit}
        >
          <div className='flex justify-between items-center gap-x-5'>
            <label className='flex-1'>
              <span className="text-sm font-semibold text-primary">Filtro</span>
              <input
                name='value'
                type="text"
                placeholder="Ingrese valor a filtrar"
                className='block w-full py-1 px-2 border border-gray-300 rounded-md border-solid outline-none focus:shadow-blue-400 focus:shadow-input-focus disabled:bg-gray-200 disabled:text-gray-500'
              />
            </label>

            <label className='min-w-[300px]'>
              <span className="text-sm font-semibold text-primary">Columnas</span>
              <select
                name='key'
                className='block w-full py-1 px-2 border border-gray-300 rounded-md border-solid outline-none focus:shadow-blue-400 focus:shadow-input-focus disabled:bg-gray-200 disabled:text-gray-500'
              >
                {
                  columnsFiltered
                    .map(({ label, key }) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {label}
                      </option>
                    ))
                }
              </select>
            </label >

            <button
              className="py-1 px-6 bg-primary text-white rounded-md mt-2 text-sm"
            >
              Filtrar
            </button>
          </div>
        </form>
      </search >

      <section className="mt-3">
        <h3 className='text-primary text-sm font-semibold'>Filtros aplicados:</h3>
        <ul className='flex gap-2 flex-wrap'>

          {
            actualParams.length === 0 && (
              <p className='text-sm text-gray-600'>No hay filtros aplicados</p>
            )
          }

          {
            actualParams
              .map(([key, value]) => {
                const label = TableColumns.find((column) => column.key === key)
                return (
                  <li
                    key={key}
                    className='text-sm px-5 py-1 bg-gray-400 inline-block text-white rounded-md text-center'
                  >
                    <div className='flex justify-between gap-2'>
                      <p className='flex items-center gap-x-1 lowercase'>
                        <span>{label?.label}:</span>
                        <span>{value}</span>
                      </p>
                      <CrossIcon className='size-5 cursor-pointer hover:text-red-900' onClick={onRemoveParam(key)}></CrossIcon>
                    </div>
                  </li>
                )
              })
          }
        </ul>
      </section>
    </>
  )
}

export default SupplierFilter