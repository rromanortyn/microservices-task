import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import envKeys from 'src/common/env-keys'

import UserEntity from 'src/data/entities/user.entity'

const typeormOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get(envKeys.database.host),
    port: parseInt(configService.getOrThrow(envKeys.database.port)),
    username: configService.get(envKeys.database.user),
    password: configService.get(envKeys.database.password),
    database: configService.get(envKeys.database.name),
    entities: [
      UserEntity,
    ],
    logging: true,
    extra: {
      max: 50,
    },
  }),
}

export default typeormOptions
