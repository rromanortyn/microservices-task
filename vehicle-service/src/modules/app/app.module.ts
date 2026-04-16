import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import RabbitMqModule from '../rabbitmq/rabbitmq.module'
import VehicleModule from '../vehicle/vehicle.module'
import configModuleOptions from './consts/config-module-options'
import typeormModuleOptions from './consts/typeorm-module-options'

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    RabbitMqModule,
    VehicleModule,
  ],
})
class AppModule {}

export default AppModule
