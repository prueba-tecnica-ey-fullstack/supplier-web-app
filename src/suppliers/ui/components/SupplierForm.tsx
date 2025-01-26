import Button from '@/common/ui/components/form/Button'
import Input from '@/common/ui/components/form/Input'
import Modal from '@/common/ui/components/utils/Modal'
import { Supplier, SupplierDto } from '@/suppliers/domain/supplier.interface'
import { useSuppliers } from '../hooks/useSuppliers'
import { SupplierService } from '@/suppliers/service/supplier.service'
import { toast } from 'sonner'
import SelectInput from '@/common/ui/components/form/SelectInput'
import { useCountries } from '../hooks/useCountries'

interface SupplierFormProps {
  isOpen: boolean
  onClose: () => void
  supplier: Supplier | null
}

const SupplierForm: React.FC<SupplierFormProps> = ({ supplier, isOpen, onClose }) => {
  const { refetch } = useSuppliers()

  const { countries } = useCountries()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { currentTarget: form } = event

    const errors = form.querySelectorAll('p.error')

    console.log(errors)

    if (Array.from(errors).length > 0) {
      toast.error('El formulario contiene errores')
      return
    }

    const data = new FormData(form)

    const dto: SupplierDto = {
      id: supplier?.id,
      name: String(data.get('name')),
      legalName: String(data.get('legalName')),
      taxIdentification: String(data.get('taxIdentification')),
      phone: String(data.get('phone')),
      email: String(data.get('email')),
      website: String(data.get('website')),
      address: String(data.get('address')),
      country: String(data.get('country')),
      annualBilling: Number(data.get('annualBilling'))
    }

    const message = `Proveedor ${supplier ? 'actualizado' : 'creado'} correctamente`

    await new SupplierService().update(dto)
      .then(() => {
        toast.success(message)
        refetch()
        onClose()
      })
      .catch(() => {
        toast.error('Hubo un error al agregar el proveedor')
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width='max-w-3xl'>
      <h4 className='text-lg uppercase text-center mb-2'>
        {supplier ? 'Editar' : 'Crear nuevo'}
        {' '}Proveedor</h4>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            label="Nombre"
            name="name"
            type="text"
            placeholder="ABC Suppliers"
            value={supplier?.name}
          />
          <Input
            label="Razón Social"
            name="legalName"
            type="text"
            placeholder="ABC Suppliers Inc."
            value={supplier?.legalName}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-2">
          <Input
            label="Identificación tributaria"
            name="taxIdentification"
            type="text"
            placeholder="20123456789"
            value={supplier?.taxIdentification}
            validations={[
              {
                type: 'regex',
                message: 'Solo debe contener números',
                regex: /^\d+$/
              },
              {
                type: 'function',
                message: 'Debe tener 11 caracteres',
                validate: (value) => value.length === 11
              }
            ]}
          />

          <Input
            label="Número telefónico"
            name="phone"
            type="tel"
            placeholder="+1 555-555-5555"
            value={supplier?.phone}
          />

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="supplier@example.com"
            value={supplier?.email}
            validations={[{
              type: 'regex',
              regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.pe)?$/,
              message: 'Ingrese un correo válido'
            }]}
          />
        </div>

        <Input
          label="Sitio web"
          name="website"
          type="url"
          placeholder="https://www.abcsuppliers.com"
          value={supplier?.website}
        />

        <Input
          label="Dirección Física"
          name="address"
          type="text"
          placeholder="123 Main St, New York, NY"
          value={supplier?.address}
        />

        <SelectInput
          label='País'
          name='country'
          objects={countries}
          optionKey='name'
          valueKey='name'
          value={supplier?.country}
          searchable
        />

        {/* <Input
          label="País"
          name="country"
          type="text"
          placeholder="United States"
          value={supplier?.country}
        /> */}

        <Input
          label="Facturación anual en dólares"
          name="annualBilling"
          type="number"
          placeholder="$ 50000.00"
          value={supplier?.annualBilling.toString()}
        />

        <footer className='flex justify-end gap-x-2'>
          <Button color="primary" type='submit'>
            {supplier ? 'Editar' : 'Crear'}
            {' '}Proveedor</Button>
          <Button color="danger" type='reset' onClick={onClose}>Cancelar</Button>
        </footer>
      </form>
    </Modal>
  )
}

export default SupplierForm