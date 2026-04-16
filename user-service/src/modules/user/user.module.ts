import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import RabbitMqModule from '../rabbitmq/rabbitmq.module'
import UserController from './user.controller'
import UserService from './user.service'
import UserEntity from 'src/data/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RabbitMqModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
class UserModule {}

export default UserModule
