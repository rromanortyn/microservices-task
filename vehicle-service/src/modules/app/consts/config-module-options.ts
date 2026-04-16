import { ConfigModuleOptions } from '@nestjs/config'

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
} as const

export default configModuleOptions
