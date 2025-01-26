import BackIcon from '@/common/ui/assets/icons/BackIcon'
import ForwardIcon from '@/common/ui/assets/icons/ForwardIcon'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSuppliers } from '../../hooks/useSuppliers'

const pageSizeList = [5, 10, 15]


const getPage = () => {
  const params = new URLSearchParams(window.location.search)
  return +(params.get('page') ?? 1)
}

const getPageSize = () => {
  const params = new URLSearchParams(window.location.search)

  const pageSize = +(params.get('pageSize') ?? 5)
  return pageSizeList.includes(pageSize) ? pageSize : 5
}

const SupplierPagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(getPage)
  const [pageSize, setPageSize] = useState(getPageSize)

  const { firstPage = 1, lastPage = 1 } = useSuppliers()

  const nextPage = (): void => {
    setPage((prevPage) => prevPage + 1 > lastPage ? lastPage : prevPage + 1)
  }

  const previousPage = (): void => {
    setPage((prevPage) => prevPage - 1 < firstPage ? firstPage : prevPage - 1)
  }

  const onLimitChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }


  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams.toString())
    updatedParams.set('page', page.toString())
    updatedParams.set('pageSize', pageSize.toString())

    setSearchParams(updatedParams, { replace: true })
  }, [page, pageSize])


  const buttons: { disabled: boolean, onClick: () => void, icon: React.ReactNode }[] = [
    {
      disabled: page === firstPage,
      onClick: previousPage,
      icon: <BackIcon className='text-gray-700 w-5 h-5' />
    },
    {
      disabled: page === lastPage,
      onClick: nextPage,
      icon: <ForwardIcon className='text-gray-700 w-5 h-5' />
    }
  ]

  return (
    <footer
      className='text-xs w-full text-gray-700 flex flex-col items-center justify-end mt-4 gap-4 md:flex-row'
    >


      <div className='flex items-center order-2 md:order-1'>
        <p className='w-24'>Rows per page:</p>
        <select
          value={pageSize}
          onChange={e => {
            onLimitChange(Number(e.target.value))
          }}
          className='cursor-pointer border-b border-solid border-gray-400 outline-none md:w-auto'
        >
          {pageSizeList?.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center gap-4 md:w-auto md:order-2'>
        <div className='flex gap-2'>
          {
            buttons.map(({ disabled, icon, onClick }, i) => (
              <div
                key={i}
                className={`h-9 w-9 grid place-items-center rounded-full px-2 transition-all duration-500 ${disabled ? 'opacity-40 cursor-default' : 'hover:bg-gray-300 cursor-pointer'}`}
              >
                <button
                  onClick={onClick} disabled={disabled}
                >
                  {icon}
                </button>
              </div>

            ))
          }
        </div>
        <span>
          Página{' '}
          <strong>
            {page}
          </strong>
        </span>
      </div>
    </footer>
  )
}

export default SupplierPagination