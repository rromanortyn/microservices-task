import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import VehicleCreatePanel from '../../components/vehicles/vehicle-create-panel'
import VehicleDetailsModal from '../../components/vehicles/vehicle-details-modal'
import VehiclesListPanel from '../../components/vehicles/vehicles-list-panel'
import { LoadingState, Notice } from '../../components/ui'
import { parsePositiveIntegerId } from '../../lib/route-params'
import {
  getErrorMessage,
  loadDashboardSnapshot,
  vehiclesApi,
} from '../../lib/api'
import type { Vehicle } from '../../types/entities'
import {
  CURRENT_VEHICLE_YEAR,
  EMPTY_VEHICLE_FORM_VALUES,
  MIN_VEHICLE_YEAR,
  type VehicleFormValues,
  toVehiclePayload,
  vehicleFormSchema,
} from './vehicle-form-schema'

function VehiclesPage() {
  const navigate = useNavigate()
  const params = useParams()
  const selectedVehicleId = parsePositiveIntegerId(params.id)

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [pageError, setPageError] = useState<string | null>(null)
  const [pageNotice, setPageNotice] = useState<string | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [createSubmitError, setCreateSubmitError] = useState<string | null>(null)

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)
  const [modalNotice, setModalNotice] = useState<string | null>(null)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreateForm,
    formState: {
      errors: createFieldErrors,
      isSubmitting: isCreating,
    },
  } = useForm<VehicleFormValues>({
    defaultValues: EMPTY_VEHICLE_FORM_VALUES,
    resolver: zodResolver(vehicleFormSchema),
  })

  const {
    register: registerModal,
    handleSubmit: handleModalSubmit,
    reset: resetModalForm,
    formState: {
      errors: modalFieldErrors,
      isSubmitting: isUpdating,
    },
  } = useForm<VehicleFormValues>({
    defaultValues: EMPTY_VEHICLE_FORM_VALUES,
    resolver: zodResolver(vehicleFormSchema),
  })

  useEffect(() => {
    let isActive = true

    async function loadPage() {
      setIsPageLoading(true)
      setPageError(null)

      try {
        const snapshot = await loadDashboardSnapshot()

        if (!isActive) {
          return
        }

        setVehicles(snapshot.vehicles)
      }

      catch (error) {
        if (!isActive) {
          return
        }

        setPageError(getErrorMessage(error, 'Failed to load vehicles.'))
      }

      finally {
        if (isActive) {
          setIsPageLoading(false)
        }
      }
    }

    void loadPage()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (params.id && selectedVehicleId === null) {
      navigate('/vehicles', { replace: true })
    }
  }, [navigate, params.id, selectedVehicleId])

  useEffect(() => {
    if (selectedVehicleId === null) {
      setSelectedVehicle(null)
      setModalError(null)
      setModalNotice(null)
      resetModalForm(EMPTY_VEHICLE_FORM_VALUES)

      return
    }

    let isActive = true
    const vehicleId = selectedVehicleId

    async function loadSelectedVehicle() {
      setIsModalLoading(true)
      setModalError(null)

      try {
        const vehicle = await vehiclesApi.getById(vehicleId)

        if (!isActive) {
          return
        }

        setSelectedVehicle(vehicle)
        resetModalForm({
          year: vehicle.year ? String(vehicle.year) : '',
          model: vehicle.model ?? '',
          userId: vehicle.userId ? String(vehicle.userId) : '',
        })
      }

      catch (error) {
        if (!isActive) {
          return
        }

        setModalError(getErrorMessage(error, 'Failed to load this vehicle.'))
      }

      finally {
        if (isActive) {
          setIsModalLoading(false)
        }
      }
    }

    void loadSelectedVehicle()

    return () => {
      isActive = false
    }
  }, [resetModalForm, selectedVehicleId])

  const draftVehiclesCount = vehicles.filter((vehicle) => !vehicle.model || !vehicle.year).length
  const yearHint = `${MIN_VEHICLE_YEAR}-${CURRENT_VEHICLE_YEAR}`

  async function refreshVehicles() {
    const nextVehicles = await vehiclesApi.list()

    setVehicles(nextVehicles)
  }

  const onCreateVehicle = handleCreateSubmit(async (values) => {
    setCreateSubmitError(null)
    setPageNotice(null)

    try {
      await vehiclesApi.create(toVehiclePayload(values))
      resetCreateForm(EMPTY_VEHICLE_FORM_VALUES)
      setPageNotice('Vehicle created successfully.')
      await refreshVehicles()
    }

    catch (error) {
      setCreateSubmitError(getErrorMessage(error, 'Failed to create vehicle.'))
    }
  })

  const onUpdateVehicle = handleModalSubmit(async (values) => {
    if (!selectedVehicle) {
      return
    }

    setModalError(null)
    setModalNotice(null)

    try {
      const updatedVehicle = await vehiclesApi.update(selectedVehicle.id, toVehiclePayload(values))

      setSelectedVehicle(updatedVehicle)
      resetModalForm({
        year: updatedVehicle.year ? String(updatedVehicle.year) : '',
        model: updatedVehicle.model ?? '',
        userId: updatedVehicle.userId ? String(updatedVehicle.userId) : '',
      })
      setModalNotice('Vehicle updated successfully.')
      await refreshVehicles()
    }

    catch (error) {
      setModalError(getErrorMessage(error, 'Failed to update vehicle.'))
    }
  })

  function openVehicleModal(id: number) {
    startTransition(() => {
      navigate(`/vehicles/${id}`)
    })
  }

  function closeVehicleModal() {
    startTransition(() => {
      navigate('/vehicles')
    })
  }

  async function deleteVehicle(vehicleId: number, origin: 'list' | 'modal') {
    const confirmed = window.confirm('Delete this vehicle?')

    if (!confirmed) {
      return
    }

    if (origin === 'modal') {
      setIsDeleting(true)
      setModalError(null)
    }

    else {
      setPageError(null)
      setPageNotice(null)
    }

    try {
      await vehiclesApi.remove(vehicleId)
      await refreshVehicles()

      if (origin === 'modal') {
        closeVehicleModal()
      }

      setPageNotice('Vehicle deleted successfully.')
    }

    catch (error) {
      const message = getErrorMessage(error, 'Failed to delete vehicle.')

      if (origin === 'modal') {
        setModalError(message)
      }

      else {
        setPageError(message)
      }
    }

    finally {
      if (origin === 'modal') {
        setIsDeleting(false)
      }
    }
  }

  const pageErrorElement = pageError ? <Notice tone="error">{pageError}</Notice> : null
  const pageNoticeElement = pageNotice ? <Notice tone="success">{pageNotice}</Notice> : null
  const createErrorElement = createSubmitError ? <Notice tone="error">{createSubmitError}</Notice> : null
  const modalErrorElement = modalError ? <Notice tone="error">{modalError}</Notice> : null
  const modalNoticeElement = modalNotice ? <Notice tone="success">{modalNotice}</Notice> : null
  const modalLoadingElement = isModalLoading ? <LoadingState label="Loading vehicle details..." /> : null

  const createPanel = (
    <VehicleCreatePanel
      createErrorElement={createErrorElement}
      errors={createFieldErrors}
      isCreating={isCreating}
      noticeElement={pageNoticeElement}
      onSubmit={onCreateVehicle}
      register={registerCreate}
      yearHint={yearHint}
    />
  )

  const listPanel = (
    <VehiclesListPanel
      draftVehiclesCount={draftVehiclesCount}
      errorElement={pageErrorElement}
      isLoading={isPageLoading}
      onDelete={(id) => {
        void deleteVehicle(id, 'list')
      }}
      onOpen={openVehicleModal}
      vehicles={vehicles}
    />
  )

  const pageGrid = (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      {createPanel}
      {listPanel}
    </div>
  )

  const vehicleDetailsModal = (
    <VehicleDetailsModal
      errorElement={modalErrorElement}
      errors={modalFieldErrors}
      isDeleting={isDeleting}
      isLoading={isModalLoading}
      isOpen={selectedVehicleId !== null}
      isUpdating={isUpdating}
      loadingElement={modalLoadingElement}
      noticeElement={modalNoticeElement}
      onClose={closeVehicleModal}
      onDelete={(id) => {
        void deleteVehicle(id, 'modal')
      }}
      onSubmit={onUpdateVehicle}
      register={registerModal}
      selectedVehicle={selectedVehicle}
      yearHint={yearHint}
    />
  )

  return (
    <>
      {pageGrid}
      {vehicleDetailsModal}
    </>
  )
}

export default VehiclesPage
