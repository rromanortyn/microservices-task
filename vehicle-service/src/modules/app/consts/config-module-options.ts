import path from 'node:path'
import { ConfigModuleOptions } from '@nestjs/config'

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: path.join(
    process.cwd(),
    'vehicle-service',
    'dist',
    '.env',
  ),
} as const

export default configModuleOptions
