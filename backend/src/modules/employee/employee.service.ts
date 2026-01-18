import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEmployeeById(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    // Check if tableNumber is already taken
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { tableNumber: createEmployeeDto.tableNumber },
    });
    if (existingEmployee) {
      throw new ConflictException('Table number already exists');
    }

    // Check if departmentId exists (if provided)
    if (createEmployeeDto.departmentId) {
      const department = await this.prisma.department.findUnique({
        where: { id: createEmployeeDto.departmentId },
      });
      if (!department) {
        throw new BadRequestException('Department not found');
      }
    }

    try {
      return await this.prisma.employee.create({
        data: {
          ...createEmployeeDto,
          firstDayOfWork: new Date(createEmployeeDto.firstDayOfWork),
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error: any) {
      // Handle unique constraint violation for tableNumber
      if (error?.code === 'P2002') {
        throw new ConflictException('Table number already exists');
      }
      throw error;
    }
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Check if tableNumber is being updated and if it's already taken
    if (updateEmployeeDto.tableNumber && updateEmployeeDto.tableNumber !== employee.tableNumber) {
      const existingEmployee = await this.prisma.employee.findUnique({
        where: { tableNumber: updateEmployeeDto.tableNumber },
      });
      if (existingEmployee) {
        throw new ConflictException('Table number already exists');
      }
    }

    // Check if departmentId exists (if provided and being updated)
    if (updateEmployeeDto.departmentId !== undefined) {
      if (updateEmployeeDto.departmentId) {
        const department = await this.prisma.department.findUnique({
          where: { id: updateEmployeeDto.departmentId },
        });
        if (!department) {
          throw new BadRequestException('Department not found');
        }
      }
    }

    try {
      return await this.prisma.employee.update({
        where: { id },
        data: {
          ...updateEmployeeDto,
          ...(updateEmployeeDto.firstDayOfWork && {
            firstDayOfWork: new Date(updateEmployeeDto.firstDayOfWork),
          }),
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Employee not found');
      }
      // Handle unique constraint violation for tableNumber
      if (error?.code === 'P2002') {
        throw new ConflictException('Table number already exists');
      }
      throw error;
    }
  }

  async deleteEmployee(id: string) {
    try {
      await this.prisma.employee.delete({
        where: { id },
      });
      return { message: 'Employee deleted successfully' };
    } catch (error: any) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Employee not found');
      }
      throw error;
    }
  }
}

