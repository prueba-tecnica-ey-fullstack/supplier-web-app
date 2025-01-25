import Modal from '@/common/ui/components/utils/Modal'
import { Supplier } from '@/suppliers/domain/supplier.interface'

interface SupplierDetailModalProps {
  isOpen: boolean
  onClose: () => void
  supplier: Supplier | null
}

const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ isOpen, onClose, supplier }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="text-center">
          <h4 className="text-xl font-bold text-gray-800 uppercase">Detalle del Proveedor</h4>
          <p className="text-sm text-gray-500">Información detallada del proveedor</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block font-medium text-gray-700">ID</span>
            <span>{supplier?.id}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Name</span>
            <span>{supplier?.name}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Legal Name</span>
            <span>{supplier?.legalName}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Tax Identification</span>
            <span>{supplier?.taxIdentification}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Phone</span>
            <span>{supplier?.phone}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Email</span>
            <span>{supplier?.email}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Website</span>
            <a
              href={supplier?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {supplier?.website}
            </a>
          </div>


          <div>
            <span className="block font-medium text-gray-700">Address</span>
            <span>{supplier?.address}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Country</span>
            <span>{supplier?.country}</span>
          </div>

          <div>
            <span className="block font-medium text-gray-700">Annual Billing</span>
            <span>$ {supplier?.annualBilling?.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </Modal>
  )
}

export default SupplierDetailModal