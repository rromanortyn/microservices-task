import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator'

import { PASSWORD_MIN_LENGTH } from 'src/common/validation/validation.constants'

class CreateUserRequestDto {
  @IsEmail()
  public email!: string

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH)
  public password!: string
}

export default CreateUserRequestDto
