import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { employeeApi, departmentApi, Employee, CreateEmployeeDto, UpdateEmployeeDto, Department } from '../api/client';
import EmployeeForm from '../components/EmployeeForm';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleError = (err: any, fallback: string) => {
    const message = err.response?.data?.message || fallback;
    toast.error(message);
  };


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [employeesData, departmentsData] = await Promise.all([
        employeeApi.getAll(),
        departmentApi.getAll(),
      ]);
      setEmployees(employeesData);
      setDepartments(departmentsData);
    } catch (err: any) {
      handleError(err, 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateEmployeeDto) => {
    try {
      await employeeApi.create(data);
      await loadData();
      setIsModalOpen(false);
    } catch (err: any) {
      handleError(err, 'Failed to create employee');
      throw err;
    }
  };

  const handleUpdate = async (id: string, data: UpdateEmployeeDto) => {
    try {
      await employeeApi.update(id, data);
      await loadData();
      setIsModalOpen(false);
      setEditingEmployee(null);
    } catch (err: any) {
      handleError(err, 'Failed to update employee');
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    try {
      await employeeApi.delete(id);
      await loadData();
    } catch (err: any) {
      handleError(err, 'Failed to delete employee');
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  if (loading) {
    return <div className="empty-state">Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Employees</h2>
        <button className="button button-primary" onClick={() => setIsModalOpen(true)}>
          Add Employee
        </button>
      </div>



      {employees.length === 0 ? (
        <div className="empty-state">No employees found. Add your first employee!</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Table Number</th>
              <th>Department</th>
              <th>Role</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.tableNumber}</td>
                <td>{employee.department?.name || 'No Department'}</td>
                <td>
                  <span className={`badge badge-${employee.role}`}>
                    {employee.role}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${employee.isActive ? 'active' : 'inactive'}`}>
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    className="button button-secondary button-small"
                    onClick={() => handleEdit(employee)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </button>
                  <button
                    className="button button-danger button-small"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <EmployeeForm
          departments={departments}
          employee={editingEmployee}
          onSubmit={editingEmployee ? (data) => handleUpdate(editingEmployee.id, data) : handleCreate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EmployeesPage;

