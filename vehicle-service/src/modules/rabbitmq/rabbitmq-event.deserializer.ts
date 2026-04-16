import {
  ConsumerDeserializer,
  IncomingEvent,
} from '@nestjs/microservices'

type RabbitMqEvent = {
  type?: string
}

class RabbitMqEventDeserializer implements ConsumerDeserializer {
  public deserialize(value: unknown): IncomingEvent {
    const event = value as RabbitMqEvent | undefined

    return {
      pattern: event?.type,
      data: value,
    }
  }
}

export default RabbitMqEventDeserializer
