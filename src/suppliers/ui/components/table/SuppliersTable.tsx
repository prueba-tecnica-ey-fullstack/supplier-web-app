import { useSuppliers } from '@/suppliers/ui/hooks/useSuppliers'
import SupplierTableHeader from './SupplierTableHeader'
import SupplierTableRow from './SupplierTableRow'
import { Supplier } from '@/suppliers/domain/supplier.interface'

interface SuppliersTableProps {
  onSelectSupplier: (action: 'edit' | 'remove' | 'detail' | 'screening', supplier: Supplier) => void
}


const SuppliersTable: React.FC<SuppliersTableProps> = ({ onSelectSupplier }) => {
  const { suppliers } = useSuppliers()

  return (
    <div className='overflow-x-auto mt-4'>
      <div className='inline-block min-w-full'>
        <div className='overflow-hidden'>
          <table className='min-w-full text-center'>
            <SupplierTableHeader></SupplierTableHeader>
            <tbody>
              {
                suppliers.map(supplier => (
                  <SupplierTableRow
                    key={supplier.id}
                    supplier={supplier}
                    onSelectSupplier={onSelectSupplier}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SuppliersTable