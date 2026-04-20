import path from 'node:path'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import VehicleEntity from 'src/data/entities/vehicle.entity'
import envKeys from 'src/common/env-keys'
import AddVehicleEntity1776341132450 from 'src/data/migrations/1776341132450-add-vehicle-entity'
import MakeVehicleFieldsNullable1776341691076 from 'src/data/migrations/1776341691076-make-vehicle-fields-nullable'

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
    VehicleEntity,
  ],
  migrations: [
    AddVehicleEntity1776341132450,
    MakeVehicleFieldsNullable1776341691076,
  ],
})

export default dataSource
