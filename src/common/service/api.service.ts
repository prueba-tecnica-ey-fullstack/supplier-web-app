import axios, { AxiosInstance, type AxiosRequestConfig } from 'axios'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export abstract class AppServices {
  protected http: AxiosInstance

  constructor(config: { baseUrl: string, contentType: string }) {

    const { baseUrl, contentType } = config

    this.http = axios.create({
      baseURL: `${API_BASE_URL}/${baseUrl}`,
      headers: {
        'Content-Type': contentType
      }
    })

    this.handleNotAuthorized(this.http)
  }

  private handleNotAuthorized(http: AxiosInstance): void {
    http.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.log('Not authorized')
        }
        return Promise.reject(error.response)
      }
    )
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.http.get<T>(url, config)
      .then((response) => response.data)
  }

  protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return await this.http.post<T>(url, data, config)
      .then((response) => response.data)
  }

  protected async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return await this.http.patch<T>(url, data, config)
      .then((response) => response.data)
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.http.delete<T>(url, config)
      .then((response) => response.data)
  }
}
