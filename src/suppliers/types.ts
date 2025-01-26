import { Supplier } from './domain/supplier.interface'

export interface Column {
  label: string
  key: keyof Supplier
  className?: string
  render?: (proceeding: Supplier) => string
  filterable: boolean
}

export interface ScreeningResponse {
  hits: number
  results: Array<{
    id: number,
    firmName: string
    address: string
    country: string
    fromDate: string
    toDate: string
    grounds: string
  }>
}