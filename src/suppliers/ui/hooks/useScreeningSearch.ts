import { ScreeningResponse } from '@/suppliers/types'
import { useQuery } from '@tanstack/react-query'
const SCREENING_API_URL = import.meta.env.VITE_SCREENING_API_URL ?? 'api'
const SCREENING_API_KEY = import.meta.env.VITE_SCREENING_API_KEY ?? 'key'

export const useScreeningSearch = ({ supplierName }: { supplierName?: string }) => {
  const {
    data: screening,
    isLoading,
    isFetching,
    error,
    isError
  } = useQuery<ScreeningResponse>({
    queryKey: ['supplier-screening', supplierName],
    queryFn: async () => {
      const url = new URL(SCREENING_API_URL)
      url.searchParams.append('supplier', supplierName!)

      return fetch(url, {
        headers: {
          'X-API-KEY': SCREENING_API_KEY
        }
      })
        .then(res => res.json())
        .then(data => data)
    },
    enabled: !!supplierName
  })


  return {
    screening,
    isLoading,
    isFetching,
    error,
    isError
  }
}