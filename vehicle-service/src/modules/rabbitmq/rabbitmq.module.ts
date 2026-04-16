import { Module } from '@nestjs/common'

import RabbitMqController from './rabbitmq.controller'

@Module({
  controllers: [RabbitMqController],
})
class RabbitMqModule {}

export default RabbitMqModule
