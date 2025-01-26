import { AppServices } from '../../common/service/api.service'
import { Supplier, SupplierDto } from '../domain/supplier.interface'
import { FindAllSupplierResponse } from '../types'

export class SupplierService extends AppServices {
  constructor() {
    super({ baseUrl: 'suppliers', contentType: 'application/json' })
  }

  async findAll(params: string) {
    return await this.get<FindAllSupplierResponse>(`?${params}`)
  }

  async update(supplier: SupplierDto) {
    if (supplier.id) {
      const { id, ...dto } = supplier
      return await this.patch<Supplier>(`/${id}`, dto)
    }

    return await this.post('', supplier)
  }

  async remove(id: number) {
    return await this.delete<Supplier>(`/${id}`)
  }
}