import { useState, useEffect } from 'react';
import { departmentApi, Department, CreateDepartmentDto } from '../api/client';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<CreateDepartmentDto>({ name: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departmentApi.getAll();
      setDepartments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await departmentApi.create(formData);
      await loadDepartments();
      setFormData({ name: '' });
      setIsFormOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create department');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: e.target.value });
    if (formErrors.name) {
      setFormErrors({});
    }
  };

  if (loading) {
    return <div className="empty-state">Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Departments</h2>
        <button className="button button-primary" onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? 'Cancel' : 'Add Department'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {isFormOpen && (
        <div className="form" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '20px' }}>Add New Department</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Department Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Human Resources"
              />
              {formErrors.name && <div className="error">{formErrors.name}</div>}
            </div>
            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Department'}
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setIsFormOpen(false);
                  setFormData({ name: '' });
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {departments.length === 0 ? (
        <div className="empty-state">No departments found. Add your first department!</div>
      ) : (
        <div>
          {departments.map((department) => (
            <div key={department.id} className="card">
              <h3>{department.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                Created: {new Date(department.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;

