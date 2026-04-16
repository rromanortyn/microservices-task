import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import RabbitMqModule from '../rabbitmq/rabbitmq.module'
import UserModule from '../user/user.module'
import typeormModuleOptions from './consts/typeorm-module-options'
import configModuleOptions from './consts/config-module-options'

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    RabbitMqModule,
    UserModule,
  ],
})
class AppModule {}

export default AppModule
