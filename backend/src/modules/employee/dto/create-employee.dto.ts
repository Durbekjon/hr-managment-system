import { IsString, IsNotEmpty, IsEnum, IsUUID, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  admin = 'admin',
  user = 'user',
}

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'First name of the employee',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the employee',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Middle name of the employee',
    example: 'Michael',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({
    description: 'Unique table number of the employee',
    example: '0012',
  })
  @IsString()
  @IsNotEmpty()
  tableNumber: string;

  @ApiProperty({
    description: 'Role of the employee',
    enum: Role,
    example: 'user',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'Department ID to assign the employee',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({
    description: 'First day of work',
    example: '2024-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  firstDayOfWork: string;

  @ApiProperty({
    description: 'Whether the employee is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

