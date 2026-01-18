import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all employees with department info' })
  @ApiResponse({ status: 200, description: 'List of all employees with department information' })
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
  @ApiBody({ type: CreateEmployeeDto, description: 'The employee to create.' })
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({ status: 200, description: 'The employee has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @ApiBody({ type: UpdateEmployeeDto, description: 'The employee data to update.' })
  updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({ status: 200, description: 'The employee has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  deleteEmployee(@Param('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}

