import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'The name of the department',
    example: 'Human Resources',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}

