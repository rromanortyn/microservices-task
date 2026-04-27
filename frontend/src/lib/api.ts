import type {
  User,
  UserPayload,
  Vehicle,
  VehiclePayload,
} from '../types/entities'
import { ApiError, httpClient } from './http'

async function get<T>(url: string) {
  const response = await httpClient.get<T>(url)
  return response.data
}

async function post<TResponse, TRequest>(url: string, payload: TRequest) {
  const response = await httpClient.post<TResponse>(url, payload)
  return response.data
}

async function put<TResponse, TRequest>(url: string, payload: TRequest) {
  const response = await httpClient.put<TResponse>(url, payload)
  return response.data
}

async function remove(url: string) {
  await httpClient.delete(url)
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong.',
) {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

export async function loadDashboardSnapshot() {
  const [users, vehicles] = await Promise.all([
    usersApi.list(),
    vehiclesApi.list(),
  ])

  return {
    users,
    vehicles,
  }
}

export const usersApi = {
  async create(payload: UserPayload) {
    return post<User, UserPayload>('/users', payload)
  },
  async getById(id: number) {
    return get<User>(`/users/${id}`)
  },
  async list() {
    return get<User[]>('/users')
  },
  async remove(id: number) {
    return remove(`/users/${id}`)
  },
  async update(id: number, payload: UserPayload) {
    return put<User, UserPayload>(`/users/${id}`, payload)
  },
}

export const vehiclesApi = {
  async create(payload: VehiclePayload) {
    return post<Vehicle, VehiclePayload>('/vehicles', payload)
  },
  async getById(id: number) {
    return get<Vehicle>(`/vehicles/${id}`)
  },
  async list() {
    return get<Vehicle[]>('/vehicles')
  },
  async remove(id: number) {
    return remove(`/vehicles/${id}`)
  },
  async update(id: number, payload: VehiclePayload) {
    return put<Vehicle, VehiclePayload>(`/vehicles/${id}`, payload)
  },
}
