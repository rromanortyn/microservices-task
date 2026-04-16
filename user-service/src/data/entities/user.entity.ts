import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { EMAIL_MAX_LENGTH } from 'src/common/validation/validation.constants'

@Entity({ name: 'users' })
class UserEntity {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({
    type: 'varchar',
    unique: true,
    length: EMAIL_MAX_LENGTH,
  })
  public email!: string

  @Column({
    type: 'varchar',
  })
  public hashedPassword!: string
}

export default UserEntity
