import axios, { AxiosHeaders } from 'axios'

type ApiErrorResponse = {
  code: string
  message: string
}

export class ApiError extends Error {
  public readonly code: string
  public readonly status: number

  constructor(message: string, status: number, code: string) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return typeof candidate.code === 'string' && typeof candidate.message === 'string'
}

export const httpClient = axios.create({
  headers: {
    Accept: 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const headers = AxiosHeaders.from(config.headers)

  headers.set('Accept', 'application/json')

  if (config.data !== undefined && !headers.get('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  config.headers = headers

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500
      const responseData = error.response?.data

      if (isApiErrorResponse(responseData)) {
        return Promise.reject(new ApiError(responseData.message, status, responseData.code))
      }

      const fallbackMessage = error.message || `Request failed with status ${status}`

      return Promise.reject(new ApiError(fallbackMessage, status, 'UNKNOWN_ERROR'))
    }

    return Promise.reject(error)
  },
)
