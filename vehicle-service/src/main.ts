import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices'

import AppModule from './modules/app/app.module'
import RabbitMqEventDeserializer from './modules/rabbitmq/rabbitmq-event.deserializer'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  // const port = Number(process.env.PORT ?? 4001)
  const port = 0
  const rabbitMqUrl = configService.getOrThrow<string>('RABBITMQ_URL')
  const userEventsQueue = configService.getOrThrow<string>('USER_EVENTS_QUEUE')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue: userEventsQueue,
        queueOptions: { durable: true },
        noAck: false,
        deserializer: new RabbitMqEventDeserializer(),
      },
    },
    { inheritAppConfig: true },
  )

  await app.startAllMicroservices()
  await app.listen(port)

  console.log(
    `[vehicle-service] RabbitMQ consumer is listening to ${userEventsQueue}`,
  )
  console.log(`[vehicle-service] HTTP server is running on port ${port}`)
}

void bootstrap()
