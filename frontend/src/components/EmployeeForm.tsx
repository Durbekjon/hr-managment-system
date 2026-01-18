import { useState, useEffect } from 'react';
import { CreateEmployeeDto, Department, Employee } from '../api/client';

interface EmployeeFormProps {
  departments: Department[];
  employee?: Employee | null;
  onSubmit: (data: CreateEmployeeDto) => Promise<void>;
  onClose: () => void;
}

const EmployeeForm = ({ departments, employee, onSubmit, onClose }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<CreateEmployeeDto>({
    firstName: '',
    lastName: '',
    middleName: '',
    tableNumber: '',
    role: 'user',
    departmentId: '',
    firstDayOfWork: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        middleName: employee.middleName,
        tableNumber: employee.tableNumber,
        role: employee.role,
        departmentId: employee.departmentId || '',
        firstDayOfWork: employee.firstDayOfWork.split('T')[0],
        isActive: employee.isActive,
      });
    }
  }, [employee]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.middleName.trim()) {
      newErrors.middleName = 'Middle name is required';
    }
    if (!formData.tableNumber.trim()) {
      newErrors.tableNumber = 'Table number is required';
    }
    if (!formData.firstDayOfWork) {
      newErrors.firstDayOfWork = 'First day of work is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const submitData: CreateEmployeeDto = {
        ...formData,
        departmentId: formData.departmentId || undefined,
      };
      await onSubmit(submitData);
    } catch (err) {
      // Error handling is done in parent component
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="middleName">Middle Name *</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            {errors.middleName && <div className="error">{errors.middleName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="tableNumber">Table Number *</label>
            <input
              type="text"
              id="tableNumber"
              name="tableNumber"
              value={formData.tableNumber}
              onChange={handleChange}
            />
            {errors.tableNumber && <div className="error">{errors.tableNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && <div className="error">{errors.role}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="departmentId">Department</label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            >
              <option value="">No Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="firstDayOfWork">First Day of Work *</label>
            <input
              type="date"
              id="firstDayOfWork"
              name="firstDayOfWork"
              value={formData.firstDayOfWork}
              onChange={handleChange}
            />
            {errors.firstDayOfWork && <div className="error">{errors.firstDayOfWork}</div>}
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '8px' }}
              />
              Active
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-primary" disabled={submitting}>
              {submitting ? 'Saving...' : employee ? 'Update' : 'Create'}
            </button>
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;

