import { Controller } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices'
import { Repository } from 'typeorm'

import VehicleEntity from 'src/data/entities/vehicle.entity'

type UserCreatedEvent = {
  type: 'USER_CREATED'
  data: {
    id: number
    email: string
  }
}

@Controller()
class RabbitMqController {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  @EventPattern('USER_CREATED')
  public async handleUserCreated(
    @Payload() event: UserCreatedEvent,
    @Ctx() context: RmqContext,
  ) {
    console.log('[vehicle-service] RabbitMQ message received', event)
    console.log('[vehicle-service] Handling USER_CREATED event', event)

    const vehicle = this.vehicleRepository.create({
      userId: event.data.id,
    })

    const savedVehicle = await this.vehicleRepository.save(vehicle)

    console.log('[vehicle-service] Empty vehicle created from USER_CREATED event', {
      id: savedVehicle.id,
      userId: savedVehicle.userId,
    })

    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)
  }
}

export default RabbitMqController
