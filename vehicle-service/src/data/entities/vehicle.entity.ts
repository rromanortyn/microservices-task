import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { MODEL_MAX_LENGTH } from 'src/common/validation/validation.constants'

@Entity({ name: 'vehicles' })
class VehicleEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ type: 'integer' })
  public year!: number

  @Column({ type: 'varchar', length: MODEL_MAX_LENGTH })
  public model!: string

  @Column({ type: 'integer', nullable: true })
  public userId!: number | null
}

export default VehicleEntity
