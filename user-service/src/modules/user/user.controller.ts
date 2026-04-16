import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import CreateUserRequestDto from './dto/request/create-user.request-dto'
import UpdateUserRequestDto from './dto/request/update-user.request-dto'
import UserService from './user.service'
import UserResponseDto from './dto/response/user.response-dto'

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    console.log('[user-service] POST /users', dto)

    const user = await this.userService.createUser(dto)

    return plainToInstance(
      UserResponseDto,
      user,
      { excludeExtraneousValues: true },
    )
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAllUsers(): Promise<UserResponseDto[]> {
    console.log('[user-service] GET /users')

    const users = await this.userService.findAllUsers()

    return plainToInstance(
      UserResponseDto,
      users,
      { excludeExtraneousValues: true },
    )
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findUserById(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<UserResponseDto> {
    console.log('[user-service] GET /users/:id', { id })

    const user = await this.userService.findUserById(id)

    return plainToInstance(
      UserResponseDto,
      user,
      { excludeExtraneousValues: true },
    )
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    console.log('[user-service] PUT /users/:id', { id, dto })

    const user = await this.userService.updateUser(id, dto)

    return plainToInstance(
      UserResponseDto,
      user,
      { excludeExtraneousValues: true },
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<void> {
    console.log('[user-service] DELETE /users/:id', { id })

    await this.userService.deleteUser(id)
  }
}

export default UserController
