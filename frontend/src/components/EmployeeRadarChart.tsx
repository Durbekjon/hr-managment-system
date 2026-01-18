
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { RadarData } from '../data/employees';

interface EmployeeRadarChartProps {
  data: RadarData[];
}

const EmployeeRadarChart: React.FC<EmployeeRadarChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#333', fontSize: 12 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#3498db" 
            strokeWidth={2}
            fill="#3498db"
            fillOpacity={0.4}
          />
          <Tooltip 
             itemStyle={{ color: '#3498db' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeRadarChart;
