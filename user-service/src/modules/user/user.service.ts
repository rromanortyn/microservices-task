import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcryptjs'
import { Repository } from 'typeorm'

import RabbitMqService from '../rabbitmq/rabbitmq.service'
import CreateUserRequestDto from './dto/request/create-user.request-dto'
import UpdateUserRequestDto from './dto/request/update-user.request-dto'
import UserEntity from 'src/data/entities/user.entity'

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly rabbitMqService: RabbitMqService,
  ) {}

  public async createUser(dto: CreateUserRequestDto): Promise<UserEntity> {
    const { email, password } = dto

    console.log('[user-service] Creating user in database', {
      email,
    })

    await this.ensureEmailIsAvailable(email)

    const user = this.userRepository.create({
      email,
      hashedPassword: await hash(password, 10),
    })

    const savedUser = await this.userRepository.save(user)

    console.log('[user-service] User saved in database', { id: savedUser.id })

    await this.rabbitMqService.publishUserCreated({
      type: 'USER_CREATED',
      data: {
        id: savedUser.id,
        email: savedUser.email,
      },
    })

    return savedUser
  }

  public async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      order: { id: 'ASC' },
    })

    console.log('[user-service] Users loaded from database', {
      count: users.length,
    })

    return users
  }

  public async findUserById(id: number): Promise<UserEntity> {
    const user = await this.findUserEntityById(id)

    return user
  }

  public async updateUser(
    id: number,
    dto: UpdateUserRequestDto,
  ): Promise<UserEntity> {
    const { email, password } = dto

    const user = await this.findUserEntityById(id)

    console.log('[user-service] Updating user', { id, dto })

    if (email && email !== user.email) {
      await this.ensureEmailIsAvailable(email)
      user.email = email
    }

    if (password) {
      user.hashedPassword = await hash(password, 10)
    }

    const updatedUser = await this.userRepository.save(user)

    console.log('[user-service] User updated', { id: updatedUser.id })

    return updatedUser
  }

  public async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.findUserEntityById(id)

    await this.userRepository.remove(user)

    console.log('[user-service] User deleted', { id })

    return user
  }

  private async findUserEntityById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`)
    }

    return user
  }

  private async ensureEmailIsAvailable(email: string) {
    const existingUser = await this.userRepository.findOneBy({ email })

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`)
    }
  }
}

export default UserService
