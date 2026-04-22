import type { Vehicle } from '../../types/entities'
import { formatVehicleLabel } from '../../lib/vehicle-labels'
import { EyeIcon, PencilIcon, TrashIcon } from '../icons'
import { IconButton } from '../ui'

type VehicleListItemProps = {
  onDelete: (id: number) => void
  onOpen: (id: number) => void
  vehicle: Vehicle
}

function VehicleListItem({ onDelete, onOpen, vehicle }: VehicleListItemProps) {
  const openVehicle = () => onOpen(vehicle.id)
  const deleteVehicle = () => onDelete(vehicle.id)

  const actionButtons = (
    <div className="flex items-center gap-2 self-end sm:self-center">
      <IconButton
        label={`Open vehicle ${vehicle.id}`}
        onClick={openVehicle}
      >
        <EyeIcon className="size-4" />
      </IconButton>
      <IconButton
        label={`Edit vehicle ${vehicle.id}`}
        onClick={openVehicle}
      >
        <PencilIcon className="size-4" />
      </IconButton>
      <IconButton
        label={`Delete vehicle ${vehicle.id}`}
        onClick={deleteVehicle}
        tone="danger"
      >
        <TrashIcon className="size-4" />
      </IconButton>
    </div>
  )

  return (
    <li className="group rounded-[1.6rem] border border-sand-200 bg-sand-50/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="flex flex-1 flex-col items-start text-left"
          onClick={openVehicle}
          type="button"
        >
          <span className="text-xs font-black uppercase tracking-[0.22em] text-primary-600">
            Vehicle #{vehicle.id}
          </span>
          <span className="mt-2 text-lg font-black text-ink-950">
            {formatVehicleLabel(vehicle)}
          </span>
          <span className="mt-1 text-sm text-ink-500">
            userId: {vehicle.userId ?? 'Not set yet'}
          </span>
        </button>
        {actionButtons}
      </div>
    </li>
  )
}

export default VehicleListItem
