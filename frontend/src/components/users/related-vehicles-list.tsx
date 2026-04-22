import type { Vehicle } from '../../types/entities'
import { formatVehicleLabel } from '../../lib/vehicle-labels'
import { ArrowOutIcon } from '../icons'
import { Button, EmptyState } from '../ui'

type RelatedVehiclesListProps = {
  onOpenVehicle: (id: number) => void
  vehicles: Vehicle[]
}

function RelatedVehiclesList({ onOpenVehicle, vehicles }: RelatedVehiclesListProps) {
  const vehicleItems = vehicles.map((vehicle) => {
    const openVehicle = () => onOpenVehicle(vehicle.id)

    const openButton = (
      <Button onClick={openVehicle} tone="ghost">
        <ArrowOutIcon className="size-4" />
        Open in vehicles
      </Button>
    )

    return (
      <li
        key={vehicle.id}
        className="rounded-3xl border border-white/90 bg-white px-4 py-4 shadow-[0_12px_30px_rgba(45,29,16,0.08)]"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-ink-950">
              {formatVehicleLabel(vehicle)}
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Vehicle #{vehicle.id}
            </p>
            <p className="text-sm text-ink-500">
              userId: {vehicle.userId ?? 'Not set'}
            </p>
          </div>
          {openButton}
        </div>
      </li>
    )
  })

  const vehiclesList = <ul className="space-y-3">{vehicleItems}</ul>

  const vehiclesContent = vehicles.length === 0
    ? (
        <EmptyState
          description="No vehicles currently match this userId on the frontend."
          title="No related vehicles"
        />
      )
    : vehiclesList

  return vehiclesContent
}

export default RelatedVehiclesList
