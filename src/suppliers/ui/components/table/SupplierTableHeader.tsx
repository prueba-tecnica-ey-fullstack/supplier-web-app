import { TableColumns } from '@/suppliers/domain/supplier.columns'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


const getSortKey = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('sort') ?? String(TableColumns[0].key)
}

const getSortOrder = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('order') === 'asc' ? 'asc' : 'desc'
}


const SupplierTableHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortKey, setSortKey] = useState<string>(getSortKey)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(getSortOrder)

  useEffect(() => {
    setSortKey(getSortKey())
    setSortOrder(getSortOrder())
  }, [searchParams])

  const onHeaderClick = (key: string) => () => {
    const isSame = sortKey === key
    const order = isSame && sortOrder === 'asc' ? 'desc' : 'asc'

    const params = new URLSearchParams(window.location.search)
    params.set('sort', key)
    params.set('order', order)

    setSearchParams(params)
  }


  return (
    <thead className='border-b border-gray-300 bg-primary text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider' >
      <tr>
        {
          TableColumns.map(({ label, key }) => (
            <th
              key={label}
              onClick={onHeaderClick(key)}
              className='text-sm text-white px-4 py-2 capitalize font-semibold cursor-pointer'
            >
              <div className='flex items-center gap-x-2'>
                {label}
                {
                  sortKey === key && (
                    <span className='mr-2'>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )
                }
              </div>
            </th>
          ))
        }

        <th
          className='text-sm text-white px-4 py-2 capitalize font-semibold cursor-pointer'
        >
          Acciones
        </th>
      </tr>
    </thead>
  )
}

export default SupplierTableHeader