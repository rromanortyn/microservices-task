import path from 'node:path'
import { ConfigModuleOptions } from '@nestjs/config'

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: path.join('user-service', '.env'),
} as const

export default configModuleOptions
