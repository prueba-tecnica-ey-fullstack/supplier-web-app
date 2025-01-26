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