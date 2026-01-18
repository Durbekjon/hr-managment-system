import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import EmployeeRadarPage from './pages/EmployeeRadarPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'employees' | 'departments' | 'radar'>('radar');

  return (
    <div>
      <Toaster position="top-right" />
      <div className="header">
        <h1>HR Management System</h1>
        <nav className="nav">
          <a
            href="#"
            className={currentPage === 'employees' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('employees');
            }}
          >
            Employees
          </a>
          <a
            href="#"
            className={currentPage === 'departments' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('departments');
            }}
          >
            Departments
          </a>
          <a
            href="#"
            className={currentPage === 'radar' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('radar');
            }}
          >
            Performance Radar
          </a>
        </nav>
      </div>
      <div className="container">
        {currentPage === 'employees' && <EmployeesPage />}
        {currentPage === 'departments' && <DepartmentsPage />}
        {currentPage === 'radar' && <EmployeeRadarPage />}
      </div>
    </div>
  );
}

export default App;

