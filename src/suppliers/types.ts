import { Supplier } from './domain/supplier.interface'

export interface Column {
  label: string
  key: keyof Supplier
  className?: string
  render?: (proceeding: Supplier) => string
  filterable: boolean
}
