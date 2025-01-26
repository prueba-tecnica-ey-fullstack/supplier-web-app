import Button from '@/common/ui/components/form/Button'
import Modal from '@/common/ui/components/utils/Modal'
import { Supplier } from '@/suppliers/domain/supplier.interface'
import { SupplierService } from '@/suppliers/service/supplier.service'
import { toast } from 'sonner'
import { useSuppliers } from '../hooks/useSuppliers'

interface DeleteSupplierModalProps {
  isOpen: boolean
  onClose: () => void
  supplier: Supplier | null
}

const DeleteSupplierModal: React.FC<DeleteSupplierModalProps> = ({ isOpen, onClose, supplier }) => {
  const { refetch } = useSuppliers()


  const handleRemoveSupplier = async () => {
    if (!supplier) return

    await new SupplierService().remove(supplier.id)
      .then(() => {
        refetch()
        toast.success('Proveedor eliminado correctamente')
        onClose()
      })
      .catch(() => {
        toast.error('Hubo un error al eliminar el proveedor')
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='text-center'>
      <h4>¿Estás seguro que quieres eliminar el proveedor <span className="font-semibold">{supplier?.name}</span>? </h4>
      <p className='text-sm text-danger'>Esta acción no se puede deshacer</p>

      <footer className='mt-4 flex flex-col md:flex-row justify-center gap-2 [&>button]:w-full [&>button]:md:w-auto'>
        <Button color='primary' onClick={onClose}>Cancelar</Button>
        <Button color='danger' onClick={handleRemoveSupplier}>Eliminar proveedor</Button>
      </footer>
    </Modal>
  )
}

export default DeleteSupplierModal