import AvatarIcon from '@/assets/avatar-user-icon.svg';
import type { Role } from '@/types/types';

export type TeamRole =
  | 'Super Admin'
  | 'Admin'
  | 'Customer service'
  | 'Support Specialist'
  | 'Moderator'
  | 'Database Administrator'
  | 'Network Engineer'
  | string; // fallback for custom roles

export interface TeamMember {
  jobId: string;
  name: string;
  email: string;
  emailaddress: string; // duplicate for now, to match JobsTable
  role: TeamRole;
  status: 'Active' | 'Pending' | 'Suspended' | string;
  avatar: string; // path to icon
  phone: string;
  dob: string;
  date: string; // date added
  lastLogin: string;
  permissions: string[];
}

export const TEAM_ROLES: TeamRole[] = ['Super Admin', 'Admin', 'Customer service'];

export const rolesData: Role[] = [
  {
    id: 'R001',
    title: 'Super Admin',
    permissions: ['Full access'],
  },
  {
    id: 'R002',
    title: 'Admin',
    permissions: ['Users', 'Service providers', 'Disputes', 'Feedback', 'Report'],
  },
  {
    id: 'R003',
    title: 'Customer service',
    permissions: ['Disputes', 'Feedback', 'Report'],
  },
  {
    id: 'R004',
    title: 'Moderator',
    permissions: ['Users', 'Service providers', 'Disputes', 'Feedback', 'Report'],
  },
];

export const teamMembersData: TeamMember[] = [
  {
    jobId: '#TM0001',
    name: 'Chisom Eze',
    email: 'chisom.eze@example.com',
    emailaddress: 'chisom.eze@example.com',
    role: 'Super Admin',
    status: 'Pending',
    avatar: AvatarIcon,
    phone: '+234 810 000 0001',
    dob: '12 Jan, 1994',
    date: '23 May, 2025',
    lastLogin: '09 Sep, 2025 09:12',
    permissions: ['Full access'],
  },
  {
    jobId: '#TM0002',
    name: 'Ifeoma Anya',
    email: 'ifeoma.anya@example.com',
    emailaddress: 'ifeoma.anya@example.com',
    role: 'Customer Service',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0002',
    dob: '05 Mar, 1992',
    date: '11 Jun, 2025',
    lastLogin: '08 Sep, 2025 15:40',
    permissions: ['Disputes', 'Feedback', 'Report'],
  },
  {
    jobId: '#TM0003',
    name: 'Ngozi Umeh',
    email: 'ngozi.umeh@example.com',
    emailaddress: 'ngozi.umeh@example.com',
    role: 'Support Specialist',
    status: 'Suspended',
    avatar: AvatarIcon,
    phone: '+234 810 000 0003',
    dob: '17 Aug, 1996',
    date: '29 Jun, 2025',
    lastLogin: '02 Sep, 2025 12:03',
    permissions: ['Job', 'Disputes', 'Feedback', 'Report'],
  },
  {
    jobId: '#TM0004',
    name: 'Tunde Adebayo',
    email: 'tunde.adebayo@example.com',
    emailaddress: 'tunde.adebayo@example.com',
    role: 'Moderator',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0004',
    dob: '01 Nov, 1990',
    date: '08 Jul, 2025',
    lastLogin: '05 Sep, 2025 18:27',
    permissions: ['Users', 'Serivce providers', 'Disputes', 'Feedback', 'Report'],
  },
  {
    jobId: '#TM0005',
    name: 'Adaobi Nwachukwu',
    email: 'adaobi.nwachukwu@example.com',
    emailaddress: 'adaobi.nwachukwu@example.com',
    role: 'Database Administrator',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0005',
    dob: '20 Feb, 1998',
    date: '19 Jul, 2025',
    lastLogin: '06 Sep, 2025 10:55',
    permissions: [
      'Users ',
      'Serivce providers ',
      'Disputes',
      'Feedback',
      'Report',
      'Team memebers',
      'Settings',
    ],
  },
  {
    jobId: '#TM0006',
    name: 'Samuel Okoro',
    email: 'samuel.okoro@example.com',
    emailaddress: 'samuel.okoro@example.com',
    role: 'Super Admin',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0006',
    dob: '03 Dec, 1991',
    date: '27 Jul, 2025',
    lastLogin: '09 Sep, 2025 07:22',
    permissions: ['Full access'],
  },
  {
    jobId: '#TM0007',
    name: 'Blessing Yakubu',
    email: 'blessing.yakubu@example.com',
    emailaddress: 'blessing.yakubu@example.com',
    role: 'Moderator',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0007',
    dob: '14 Apr, 1995',
    date: '02 Aug, 2025',
    lastLogin: '07 Sep, 2025 21:10',
    permissions: ['Settings'],
  },
  {
    jobId: '#TM0008',
    name: 'Uche Nnaji',
    email: 'uche.nnaji@example.com',
    emailaddress: 'uche.nnaji@example.com',
    role: 'Network Engineer',
    status: 'Active',
    avatar: AvatarIcon,
    phone: '+234 810 000 0008',
    dob: '28 Sep, 1997',
    date: '14 Aug, 2025',
    lastLogin: '09 Sep, 2025 11:00',
    permissions: ['tickets:write'],
  },
];
