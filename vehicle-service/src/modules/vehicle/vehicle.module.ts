import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import VehicleEntity from 'src/data/entities/vehicle.entity'
import VehicleController from './vehicle.controller'
import VehicleService from './vehicle.service'

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
class VehicleModule {}

export default VehicleModule
