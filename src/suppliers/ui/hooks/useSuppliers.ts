import { SupplierService } from '@/suppliers/service/supplier.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const useSuppliers = () => {
  const [searchParams] = useSearchParams()

  const {
    data: suppliers = [],
    isFetching,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['suppliers', searchParams.toString()],
    queryFn: async () => new SupplierService().findAll(searchParams.toString()),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  })


  return {
    suppliers,
    isFetching,
    isLoading,
    refetch,
    isError,
    error
  }
}