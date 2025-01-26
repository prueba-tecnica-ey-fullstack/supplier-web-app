import { SupplierService } from '@/suppliers/service/supplier.service'
import { FindAllSupplierResponse } from '@/suppliers/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const useSuppliers = () => {
  const [searchParams] = useSearchParams()

  const {
    data: response,
    isFetching,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<FindAllSupplierResponse>({
    queryKey: ['suppliers', searchParams.toString()],
    queryFn: async () => new SupplierService().findAll(searchParams.toString()),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })


  const { data: suppliers = [], page, pageSize, firstPage, lastPage } = response ?? {}

  return {
    suppliers,
    isFetching,
    isLoading,
    refetch,
    isError,
    error,
    page,
    pageSize,
    firstPage,
    lastPage
  }
}