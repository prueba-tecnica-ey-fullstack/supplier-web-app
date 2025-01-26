import Modal from '@/common/ui/components/utils/Modal'
import { Supplier } from '@/suppliers/domain/supplier.interface'
import { useScreeningSearch } from '../hooks/useScreeningSearch'
import CrossIcon from '@/common/ui/assets/icons/CrossIcon'

interface ScreeningModalProps {
  isOpen: boolean
  onClose: () => void
  supplier: Supplier | null
}

const ScreeningModal: React.FC<ScreeningModalProps> = ({ isOpen, onClose, supplier }) => {
  const { screening } = useScreeningSearch({ supplierName: supplier?.legalName })

  const { hits, results } = screening ?? { hits: 0, results: [] }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CrossIcon
        className='size-6 text-danger absolute right-5 cursor-pointer'
        onClick={onClose}
      />

      <h4 className='text-lg mt-6 sm:mt-0'>Búsqueda de <span className="font-semibold italic">{supplier?.name}</span></h4>
      <p className='text-danger text-sm mb-3'>Resultados de la búsqueda en listas de alto riesgo</p>

      {
        hits === 0 && <p className='text-gray-700'>No se encontraron resultados para este proveedor</p>
      }

      {
        hits > 0 && (
          <>
            <p>Número de resultados de la búsqueda: {hits}</p>

            <ul>
              {results.map(result => (
                <li key={result.id}
                  className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md'
                >
                  <p>Nombre: {result.firmName}</p>
                  <p>Desde: {result.fromDate}</p>
                  <p>Hasta: {result.toDate}</p>
                  <p>Faltas: {result.grounds}</p>
                </li>
              ))}
            </ul>
          </>
        )
      }

    </Modal>
  )
}

export default ScreeningModal