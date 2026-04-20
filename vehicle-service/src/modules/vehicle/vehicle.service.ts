import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import VehicleEntity from 'src/data/entities/vehicle.entity'
import CreateVehicleRequestDto from './dto/request/create-vehicle.request-dto'
import UpdateVehicleRequestDto from './dto/request/update-vehicle.request-dto'

@Injectable()
class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  public async createVehicle(
    dto: CreateVehicleRequestDto,
  ): Promise<VehicleEntity> {
    console.log('[vehicle-service] Creating vehicle in database', dto)

    const vehicle = this.vehicleRepository.create({
      year: dto.year,
      model: dto.model,
      userId: dto.userId,
    })

    const savedVehicle = await this.vehicleRepository.save(vehicle)

    console.log('[vehicle-service] Vehicle saved in database', {
      id: savedVehicle.id,
    })

    return savedVehicle
  }

  public async findAllVehicles(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleRepository.find({
      order: { id: 'ASC' },
    })

    console.log('[vehicle-service] Vehicles loaded from database', {
      count: vehicles.length,
    })

    return vehicles
  }

  public async findVehicleById(id: number): Promise<VehicleEntity> {
    return this.findVehicleEntityById(id)
  }

  public async updateVehicle(
    id: number,
    dto: UpdateVehicleRequestDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.findVehicleEntityById(id)

    console.log('[vehicle-service] Updating vehicle', { id, dto })

    if (dto.year !== undefined) {
      vehicle.year = dto.year
    }

    if (dto.model !== undefined) {
      vehicle.model = dto.model
    }

    if (dto.userId !== undefined) {
      vehicle.userId = dto.userId
    }

    const updatedVehicle = await this.vehicleRepository.save(vehicle)

    console.log('[vehicle-service] Vehicle updated', { id: updatedVehicle.id })

    return updatedVehicle
  }

  public async deleteVehicle(id: number): Promise<VehicleEntity> {
    const vehicle = await this.findVehicleEntityById(id)

    await this.vehicleRepository.remove(vehicle)

    console.log('[vehicle-service] Vehicle deleted', { id })

    return vehicle
  }

  private async findVehicleEntityById(id: number): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOneBy({ id })

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} was not found`)
    }

    return vehicle
  }
}

export default VehicleService
