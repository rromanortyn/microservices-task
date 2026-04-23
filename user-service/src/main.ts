import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import AppModule from './modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // const port = Number(process.env.PORT ?? 4001)
  const port = 0

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(port)

  const url = app.getUrl()
  console.log(`[user-service] HTTP server is running on ${url}`)
}

void bootstrap()
