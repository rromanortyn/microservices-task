import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import VehicleEntity from 'src/data/entities/vehicle.entity'
import RabbitMqController from './rabbitmq.controller'

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [RabbitMqController],
})
class RabbitMqModule {}

export default RabbitMqModule
