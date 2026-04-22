import type { Vehicle } from '../types/entities'

export function formatVehicleLabel(vehicle: Vehicle) {
  if (vehicle.year && vehicle.model) {
    return `${vehicle.year} ${vehicle.model}`
  }

  if (vehicle.model) {
    return vehicle.model
  }

  if (vehicle.year) {
    return `Vehicle (${vehicle.year})`
  }

  return 'Vehicle awaiting details'
}
