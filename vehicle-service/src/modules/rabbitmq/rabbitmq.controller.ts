import { Controller } from '@nestjs/common'
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices'

type UserCreatedEvent = {
  type: 'USER_CREATED'
  data: {
    id: number
    email: string
  }
}

@Controller()
class RabbitMqController {
  @EventPattern('USER_CREATED')
  public handleUserCreated(
    @Payload() event: UserCreatedEvent,
    @Ctx() context: RmqContext,
  ) {
    console.log('[vehicle-service] RabbitMQ message received', event)
    console.log('[vehicle-service] Handling USER_CREATED event', event)

    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)
  }
}

export default RabbitMqController
