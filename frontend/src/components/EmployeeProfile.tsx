
import React from 'react';
import { Briefcase, Award, Clock, MapPin } from 'lucide-react';
import { Employee } from '../data/employees';
import EmployeeRadarChart from './EmployeeRadarChart';

interface EmployeeProfileProps {
  employee: Employee;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <img 
          src={employee.image} 
          alt={employee.name} 
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }}
        />
        <div>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{employee.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', color: '#666', gap: '8px' }}>
            <Briefcase size={16} />
            <span>{employee.role}</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
            <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#333' }}>Employee Details</h3>
            
            <div style={{ marginBottom: '20px' }}>
                <p style={{ lineHeight: '1.6', color: '#555' }}>
                    {employee.bio}
                </p>
            </div>

            <table className="table" style={{ marginTop: '10px' }}>
                <tbody>
                    <tr>
                        <td style={{ fontWeight: '600', width: '150px' }}>Experience</td>
                        <td>{employee.experience}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: '600' }}>Age</td>
                        <td>{employee.age}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: '600' }}>Department</td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <MapPin size={16} /> {employee.department}
                        </td>
                    </tr>
                     <tr>
                        <td style={{ fontWeight: '600' }}>Shift</td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <Clock size={16} /> 09:00 - 18:00
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '18px', color: '#333', alignSelf: 'flex-start' }}>Skills Radar</h3>
            <div style={{ width: '100%', height: '400px', border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
                 <EmployeeRadarChart data={employee.stats} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
