import Header from '@/common/ui/components/Header'
import SuppliersTable from '@/suppliers/ui/components/table/SuppliersTable'
import SupplierForm from '../components/SupplierForm'
import { useBooleanState } from '@/common/lib/hooks/useBooleanState'
import Button from '@/common/ui/components/form/Button'
import { useState } from 'react'
import { Supplier } from '@/suppliers/domain/supplier.interface'
import { Toaster } from 'sonner'
import DeleteSupplierModal from '../components/DeleteSupplierModal'
import SupplierFilter from '../components/SupplierFilter'
import SupplierDetailModal from '../components/SupplierDetailModal'

const SuppliersPage: React.FC = () => {
  const [showSupplierForm, toggleShowSupplierForm] = useBooleanState()
  const [showDeleteModal, toggleShowDeleteModal] = useBooleanState()
  const [showDetailModal, toggleShowDetailModal] = useBooleanState()

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)


  const handleClose = (action: 'form' | 'remove' | 'detail') => () => {
    setSelectedSupplier(null)

    if (action === 'form') toggleShowSupplierForm()
    if (action === 'remove') toggleShowDeleteModal()
    if (action === 'detail') toggleShowDetailModal()
  }

  const handleSelectSupplier = (action: 'edit' | 'remove' | 'detail', supplier: Supplier) => {

    setSelectedSupplier(supplier)

    if (action === 'edit') toggleShowSupplierForm()
    if (action === 'remove') toggleShowDeleteModal()
    if (action === 'detail') toggleShowDetailModal()
  }

  return (
    <>
      <Header></Header>

      <main className='container'>
        <div className='flex justify-between items-center'>
          <h1 className='mt-4 mb-2 text-xl uppercase'>Proveedores</h1>

          <Button color='primary' onClick={toggleShowSupplierForm}>Agregar Proveedor</Button>
        </div>

        <SupplierFilter></SupplierFilter>
        <SuppliersTable onSelectSupplier={handleSelectSupplier} />
      </main>

      <SupplierForm
        isOpen={showSupplierForm}
        onClose={handleClose('form')}
        supplier={selectedSupplier}
      />

      <DeleteSupplierModal
        isOpen={showDeleteModal}
        onClose={handleClose('remove')}
        supplier={selectedSupplier}
      />

      <SupplierDetailModal
        isOpen={showDetailModal}
        onClose={handleClose('detail')}
        supplier={selectedSupplier}
      />

      <Toaster closeButton richColors></Toaster>
    </>
  )
}

export default SuppliersPage