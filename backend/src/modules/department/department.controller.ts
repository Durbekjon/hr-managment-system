import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 201, description: 'The department has been successfully created.' })
  @ApiBody({ type: CreateDepartmentDto, description: 'The department to create.' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'The departments have been successfully retrieved.' })
  getAllDepartments() {
    return this.departmentService.getAllDepartments();
  }
}
