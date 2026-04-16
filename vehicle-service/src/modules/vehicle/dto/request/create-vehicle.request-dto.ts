import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

import {
  MAX_VEHICLE_YEAR,
  MIN_VEHICLE_YEAR,
  MODEL_MAX_LENGTH,
} from 'src/common/validation/validation.constants'

class CreateVehicleRequestDto {
  @IsInt()
  @Min(MIN_VEHICLE_YEAR)
  @Max(MAX_VEHICLE_YEAR)
  public year!: number

  @IsString()
  @MaxLength(MODEL_MAX_LENGTH)
  @MinLength(1)
  public model!: string

  @IsOptional()
  @IsInt()
  @Min(1)
  public userId?: number
}

export default CreateVehicleRequestDto
