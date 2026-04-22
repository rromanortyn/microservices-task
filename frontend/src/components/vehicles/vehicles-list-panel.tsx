import type { ReactNode } from 'react'

import type { Vehicle } from '../../types/entities'
import { EmptyState, LoadingState, Panel } from '../ui'
import VehicleListItem from './vehicle-list-item'

type VehiclesListPanelProps = {
  draftVehiclesCount: number
  errorElement: ReactNode
  isLoading: boolean
  onDelete: (id: number) => void
  onOpen: (id: number) => void
  vehicles: Vehicle[]
}

function VehiclesListPanel({
  draftVehiclesCount,
  errorElement,
  isLoading,
  onDelete,
  onOpen,
  vehicles,
}: VehiclesListPanelProps) {
  const vehicleItems = vehicles.map((vehicle) => (
    <VehicleListItem
      key={vehicle.id}
      onDelete={onDelete}
      onOpen={onOpen}
      vehicle={vehicle}
    />
  ))

  const vehiclesList = <ul className="space-y-3">{vehicleItems}</ul>
  const subtitle = `${draftVehiclesCount} vehicle${draftVehiclesCount === 1 ? '' : 's'} still need year or model details.`

  const vehiclesListContent = isLoading
    ? <LoadingState label="Loading vehicles..." />
    : vehicles.length === 0
      ? (
          <EmptyState
            description="Create a vehicle to populate the list."
            title="No vehicles yet"
          />
        )
      : vehiclesList

  return (
    <Panel subtitle={subtitle} title={`Vehicles (${vehicles.length})`}>
      <div className="space-y-4">
        {errorElement}
        {vehiclesListContent}
      </div>
    </Panel>
  )
}

export default VehiclesListPanel
