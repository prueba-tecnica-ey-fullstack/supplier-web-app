import EditIcon from '@/common/ui/assets/icons/EditIcon'
import EyeIcon from '@/common/ui/assets/icons/EyeIcon'
import RemoveIcon from '@/common/ui/assets/icons/RemoveIcon'
import SearchIcon from '@/common/ui/assets/icons/SearchIcon'
import { TableColumns } from '@/suppliers/domain/supplier.columns'
import { Supplier } from '@/suppliers/domain/supplier.interface'

interface SupplierTableRowProps {
  supplier: Supplier
  onSelectSupplier: (action: 'edit' | 'remove' | 'detail' | 'screening', supplier: Supplier) => void
}

const SupplierTableRow: React.FC<SupplierTableRowProps> = ({ supplier, onSelectSupplier }) => {
  return (
    <tr
      className='border-b [&>td]:text-sm [&>td]:text-gray-900 [&>td]:px-4 [&>td]:py-2 hover:bg-gray-100 transition-colors duration-200 border-none'
    >
      {
        TableColumns.map(({ key, className, render }) => {
          const val = String(supplier[key])
          return (
            <td key={key} className={`${className} text-left`}>
              {
                render ? render(supplier) : val
              }
            </td>
          )
        })
      }
      <td>
        <div className='grid grid-cols-4 gap-2'>
          <EyeIcon
            title='Ver detalle proveedor'
            className='size-5 cursor-pointer hover:text-primary'
            onClick={() => {
              onSelectSupplier('detail', supplier)
            }}
          />
          <EditIcon
            title='Editar proveedor'
            className='size-5 cursor-pointer hover:text-primary'
            onClick={() => {
              onSelectSupplier('edit', supplier)
            }}
          />
          <RemoveIcon
            title='Eliminar proveedor'
            className='size-5 cursor-pointer hover:text-danger'
            onClick={() => {
              onSelectSupplier('remove', supplier)
            }}
          />
          <SearchIcon
            title='Screening'
            className='size-5 cursor-pointer hover:text-success'
            onClick={() => {
              onSelectSupplier('screening', supplier)
            }}
          />
        </div>
      </td>
    </tr>
  )
}

export default SupplierTableRow