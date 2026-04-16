import { Expose } from 'class-transformer'

class VehicleResponseDto {
  @Expose()
  public id: number

  @Expose()
  public year: number

  @Expose()
  public model: string

  @Expose()
  public userId: number | null
}

export default VehicleResponseDto
