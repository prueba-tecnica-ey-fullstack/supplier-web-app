import moment from 'moment'
import { Supplier } from './domain/supplier.interface'

export interface Column {
  label: string
  key: keyof Supplier
  className?: string
  render?: (proceeding: Supplier) => string
  filterable: boolean
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