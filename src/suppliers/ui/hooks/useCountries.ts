import { useQuery } from '@tanstack/react-query'

export type CountryResponse = {
  name: {
    common: string
  },
  cca2: string
}

export type Country = {
  name: string
  code: string
}

export const useCountries = () => {
  const {
    data: countries = []
  } = useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      return fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
        .then((res) => res.json())
        .then((data) => data.map((country: CountryResponse) => ({
          name: country.name.common,
          code: country.cca2
        })))
        .then((countries: Country[]) => countries.toSorted((a,b) => a.name.localeCompare(b.name)))
    },
    refetchOnWindowFocus: false
  })


  return {
    countries
  }
}