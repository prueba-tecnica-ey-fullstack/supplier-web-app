import moment from 'moment'
import { Column } from '../types'

export interface Supplier {
  id: number
  name: string
  legalName: string
  taxIdentification: string
  phone: string
  email: string
  website: string
  address: string
  country: string
  annualBilling: number

  createdDate: string
  updatedDate: string
}

export type SupplierDto = Omit<Supplier, 'id' | 'createdDate' | 'updatedDate'> & {
  id?: number
}

export const TableColumns: Column[] = [
  {
    label: 'Fecha',
    key: 'updatedDate',
    filterable: false,
    render: (supplier) => moment(supplier.updatedDate).format('DD/MM/YYYY')
  },
  {
    label: 'Nombre comercial',
    key: 'name',
    filterable: true
  },
  {
    label: 'Razón Social',
    key: 'legalName',
    filterable: true
  },
  {
    label: 'Id. Tributaria',
    key: 'taxIdentification',
    filterable: true
  },
  {
    label: 'Teléfono',
    key: 'phone',
    filterable: true
  },
  {
    label: 'Correo',
    key: 'email',
    filterable: true
  },
  {
    label: 'Sitio Web',
    key: 'website',
    filterable: true
  },
  {
    label: 'Dirección',
    key: 'address',
    filterable: true
  },
  {
    label: 'País',
    key: 'country',
    filterable: true
  }
]