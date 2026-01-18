import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {
    
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  async getAllDepartments() {
    return this.prisma.department.findMany();
  }

  async getDepartmentById(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      const department = await this.prisma.department.update({
        where: { id },
        data: updateDepartmentDto,
      });
      return department;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Department not found');
      }
      throw error;
    }
  }
}
