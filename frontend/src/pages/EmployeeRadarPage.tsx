
import { useState } from 'react';
import { employees } from '../data/employees';
import EmployeeProfile from '../components/EmployeeProfile';

const EmployeeRadarPage = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0].id);
  
  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId) || employees[0];

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Performance Radar</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                 <select 
                    className="form-group select"
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minWidth: '200px' }}
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                 >
                     {employees.map(emp => (
                         <option key={emp.id} value={emp.id}>{emp.name}</option>
                     ))}
                 </select>
            </div>
        </div>

      <div style={{ marginTop: '20px' }}>
        <EmployeeProfile employee={selectedEmployee} />
      </div>
    </div>
  );
};

export default EmployeeRadarPage;
