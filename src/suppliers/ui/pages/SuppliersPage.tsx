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
import ScreeningModal from '../components/ScreeningModal'
import SupplierPagination from '../components/table/SupplierPagination'

const SuppliersPage: React.FC = () => {
  const [showSupplierForm, toggleShowSupplierForm] = useBooleanState()
  const [showDeleteModal, toggleShowDeleteModal] = useBooleanState()
  const [showDetailModal, toggleShowDetailModal] = useBooleanState()
  const [showScreeningModal, toggleShowScreeningModal] = useBooleanState()

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)


  const handleClose = (action: 'form' | 'remove' | 'detail' | 'screening') => () => {
    setSelectedSupplier(null)

    if (action === 'form') toggleShowSupplierForm()
    if (action === 'remove') toggleShowDeleteModal()
    if (action === 'detail') toggleShowDetailModal()
      if (action === 'screening') toggleShowScreeningModal()
  }

  const handleSelectSupplier = (action: 'edit' | 'remove' | 'detail' | 'screening', supplier: Supplier) => {

    setSelectedSupplier(supplier)

    if (action === 'edit') toggleShowSupplierForm()
    if (action === 'remove') toggleShowDeleteModal()
    if (action === 'detail') toggleShowDetailModal()
    if (action === 'screening') toggleShowScreeningModal()
  }

  return (
    <>
      <Header></Header>

      <main className='container'>
        <div className='mb-4 md:mb-0 md:flex justify-between items-center'>
          <h1 className='mb-2 mt-4 md:mb-2 text-xl uppercase'>Proveedores</h1>

          <Button color='primary' onClick={toggleShowSupplierForm}>Agregar Proveedor</Button>
        </div>

        <SupplierFilter></SupplierFilter>
        <SuppliersTable onSelectSupplier={handleSelectSupplier} />
        <SupplierPagination></SupplierPagination>
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

      <ScreeningModal
        isOpen={showScreeningModal}
        onClose={handleClose('screening')}
        supplier={selectedSupplier}
      />

      <Toaster closeButton richColors></Toaster>
    </>
  )
}

export default SuppliersPage