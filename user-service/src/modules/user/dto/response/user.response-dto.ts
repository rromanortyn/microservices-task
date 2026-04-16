import { Expose } from 'class-transformer'

class UserResponseDto {
  @Expose()
  id: number
  
  @Expose()
  email: string
}

export default UserResponseDto
