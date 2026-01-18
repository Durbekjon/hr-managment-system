import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [PrismaModule, DepartmentModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
