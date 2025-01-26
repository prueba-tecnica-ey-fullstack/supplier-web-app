import moment from 'moment'
import { Column } from '../types'

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
    filterable: true,
    render: (supplier) => (
      <a
        href={supplier?.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {supplier?.website}
      </a>
    )
  },
  {
    label: 'País',
    key: 'country',
    filterable: true
  }
]