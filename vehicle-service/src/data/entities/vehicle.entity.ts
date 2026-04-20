import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { MODEL_MAX_LENGTH } from 'src/common/validation/validation.constants'

@Entity({ name: 'vehicles' })
class VehicleEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'integer' })
  public userId!: number

  @Column({ type: 'integer', nullable: true })
  public year?: number

  @Column({ type: 'varchar', length: MODEL_MAX_LENGTH, nullable: true })
  public model?: string
}

export default VehicleEntity
