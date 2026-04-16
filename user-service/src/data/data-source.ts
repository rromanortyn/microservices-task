import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import UserEntity from 'src/data/entities/user.entity'
import envKeys from 'src/common/env-keys'
import AddUserEntity1776340960443 from 'src/data/migrations/1776340960443-add-user-entity'

dotenv.config({
  path: path.join(process.cwd(), `.env`),
})

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env[envKeys.database.host],
  port: parseInt(process.env[envKeys.database.port]!),
  username: process.env[envKeys.database.user],
  password: process.env[envKeys.database.password],
  database: process.env[envKeys.database.name],
  entities: [
    UserEntity,
  ],
  migrations: [
    AddUserEntity1776340960443,
  ],
})

export default dataSource
