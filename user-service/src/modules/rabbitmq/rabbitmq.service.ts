import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  Channel,
  ChannelModel,
  connect,
} from 'amqplib'

type UserCreatedEvent = {
  type: 'USER_CREATED'
  data: {
    id: number
    email: string
  }
}

@Injectable()
class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private channel?: Channel
  private connection?: ChannelModel
  RABBITMQ_URL: string
  USER_EVENTS_QUEUE: string

  constructor(private configService: ConfigService) {
    this.RABBITMQ_URL = this.configService.getOrThrow('RABBITMQ_URL')
    this.USER_EVENTS_QUEUE = this.configService.getOrThrow('USER_EVENTS_QUEUE')
  }

  public async onModuleInit() {
    console.log(`[user-service] Connecting to RabbitMQ at ${this.RABBITMQ_URL}`)

    this.connection = await connect(this.RABBITMQ_URL)
    this.channel = await this.connection.createChannel()

    await this.channel.assertQueue(
      this.USER_EVENTS_QUEUE,
      { durable: true },
    )

    console.log(`[user-service] RabbitMQ queue is ready: ${this.USER_EVENTS_QUEUE}`)
  }

  public async onModuleDestroy() {
    console.log('[user-service] Closing RabbitMQ connection')

    await this.channel?.close()
    await this.connection?.close()
  }

  public async publishUserCreated(event: UserCreatedEvent) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized')
    }

    console.log('[user-service] Publishing USER_CREATED event', event)

    const published = this.channel.sendToQueue(
      this.USER_EVENTS_QUEUE,
      Buffer.from(JSON.stringify(event)),
      { persistent: true },
    )

    console.log('[user-service] USER_CREATED event published', { published })
  }
}

export default RabbitMqService