import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Department {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  middleName: string;
  tableNumber: string;
  departmentId?: string;
  department?: {
    id: string;
    name: string;
  };
  firstDayOfWork: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  middleName: string;
  tableNumber: string;
  role: 'admin' | 'user';
  departmentId?: string;
  firstDayOfWork: string;
  isActive?: boolean;
}

export interface UpdateEmployeeDto extends Partial<CreateEmployeeDto> {}

export interface CreateDepartmentDto {
  name: string;
}

// Employee API
export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>('/employees');
    return response.data;
  },
  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    const response = await apiClient.post<Employee>('/employees', data);
    return response.data;
  },
  update: async (id: string, data: UpdateEmployeeDto): Promise<Employee> => {
    const response = await apiClient.put<Employee>(`/employees/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },
};

// Department API
export const departmentApi = {
  getAll: async (): Promise<Department[]> => {
    const response = await apiClient.get<Department[]>('/departments');
    return response.data;
  },
  create: async (data: CreateDepartmentDto): Promise<Department> => {
    const response = await apiClient.post<Department>('/departments', data);
    return response.data;
  },
};

