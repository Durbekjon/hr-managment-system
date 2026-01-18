-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "tableNumber" TEXT NOT NULL,
    "departmentId" TEXT,
    "firstDayOfWork" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_tableNumber_key" ON "employees"("tableNumber");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
