import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import CreateVehicleRequestDto from './dto/request/create-vehicle.request-dto'
import UpdateVehicleRequestDto from './dto/request/update-vehicle.request-dto'
import VehicleResponseDto from './dto/response/vehicle.response-dto'
import VehicleService from './vehicle.service'

@Controller('vehicles')
class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createVehicle(
    @Body() dto: CreateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    console.log('[vehicle-service] POST /vehicles', dto)

    const vehicle = await this.vehicleService.createVehicle(dto)

    return plainToInstance(
      VehicleResponseDto,
      vehicle,
      { excludeExtraneousValues: true },
    )
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllVehicles(): Promise<VehicleResponseDto[]> {
    console.log('[vehicle-service] GET /vehicles')

    const vehicles = await this.vehicleService.findAllVehicles()

    return plainToInstance(
      VehicleResponseDto,
      vehicles,
      { excludeExtraneousValues: true },
    )
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findVehicleById(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<VehicleResponseDto> {
    console.log('[vehicle-service] GET /vehicles/:id', { id })

    const vehicle = await this.vehicleService.findVehicleById(id)

    return plainToInstance(
      VehicleResponseDto,
      vehicle,
      { excludeExtraneousValues: true },
    )
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async updateVehicle(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: UpdateVehicleRequestDto,
  ): Promise<VehicleResponseDto> {
    console.log('[vehicle-service] PUT /vehicles/:id', { id, dto })

    const vehicle = await this.vehicleService.updateVehicle(id, dto)

    return plainToInstance(
      VehicleResponseDto,
      vehicle,
      { excludeExtraneousValues: true },
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteVehicle(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<void> {
    console.log('[vehicle-service] DELETE /vehicles/:id', { id })

    await this.vehicleService.deleteVehicle(id)
  }
}

export default VehicleController
