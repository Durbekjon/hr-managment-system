
export interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: string;
  age: number;
  image: string;
  stats: RadarData[];
  bio: string;
}

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    role: 'Production Manager',
    department: 'Assembly Line A',
    experience: '12 Years',
    age: 42,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    bio: 'Sarah oversees the main assembly line with a focus on efficiency and safety standards.',
    stats: [
      { subject: 'Efficiency', A: 95, fullMark: 100 },
      { subject: 'Technical', A: 80, fullMark: 100 },
      { subject: 'Leadership', A: 90, fullMark: 100 },
      { subject: 'Safety', A: 100, fullMark: 100 },
      { subject: 'Punctuality', A: 85, fullMark: 100 },
    ],
  },
  {
    id: '2',
    name: 'John Anderson',
    role: 'Quality Control Specialist',
    department: 'Quality Assurance',
    experience: '8 Years',
    age: 35,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
    bio: 'John ensures that every product leaving the factory meets our rigorous quality benchmarks.',
    stats: [
      { subject: 'Efficiency', A: 75, fullMark: 100 },
      { subject: 'Technical', A: 95, fullMark: 100 },
      { subject: 'Leadership', A: 70, fullMark: 100 },
      { subject: 'Safety', A: 90, fullMark: 100 },
      { subject: 'Punctuality', A: 95, fullMark: 100 },
    ],
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Logistics Coordinator',
    department: 'Supply Chain',
    experience: '5 Years',
    age: 29,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    bio: 'Emily manages the flow of materials and goods, optimizing the supply chain process.',
    stats: [
      { subject: 'Efficiency', A: 90, fullMark: 100 },
      { subject: 'Technical', A: 60, fullMark: 100 },
      { subject: 'Leadership', A: 75, fullMark: 100 },
      { subject: 'Safety', A: 80, fullMark: 100 },
      { subject: 'Punctuality', A: 90, fullMark: 100 },
    ],
  },
  {
    id: '4',
    name: 'Michael Ross',
    role: 'Safety Officer',
    department: 'Health & Safety',
    experience: '15 Years',
    age: 48,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    bio: 'Michael is dedicated to maintaining a zero-accident workplace through training and oversight.',
    stats: [
      { subject: 'Efficiency', A: 70, fullMark: 100 },
      { subject: 'Technical', A: 85, fullMark: 100 },
      { subject: 'Leadership', A: 85, fullMark: 100 },
      { subject: 'Safety', A: 100, fullMark: 100 },
      { subject: 'Punctuality', A: 80, fullMark: 100 },
    ],
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Maintenance Lead',
    department: 'Maintenance',
    experience: '20 Years',
    age: 52,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    bio: 'David brings decades of experience to keep our machinery running smoothly and minimize downtime.',
    stats: [
      { subject: 'Efficiency', A: 85, fullMark: 100 },
      { subject: 'Technical', A: 100, fullMark: 100 },
      { subject: 'Leadership', A: 80, fullMark: 100 },
      { subject: 'Safety', A: 90, fullMark: 100 },
      { subject: 'Punctuality', A: 75, fullMark: 100 },
    ],
  },
];
