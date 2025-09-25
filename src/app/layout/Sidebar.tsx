'use client';
// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DailyHelpLogo from '@/assets/DailyHelpLogo.svg';
import DisputeIcon from '@/assets/dispute-icon.svg';
import FeedbkIcon from '@/assets/feedbk-icon.svg';
import JobsIcon from '@/assets/jobs-icon.svg';
import ReportIcon from '@/assets/report-icon.svg';
import ServiceIcon from '@/assets/service-icon.svg';
import SettingIcon from '@/assets/setting-icon.svg';
import TeamIcon from '@/assets/team-icon.svg';
import UserIcon from '@/assets/user-icon.svg';
import DashIcon from '@/assets/dash-icon.svg';

const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: DashIcon },
  { label: 'Users', href: '/users', icon: UserIcon },
  { label: 'Service Providers', href: '/providers', icon: ServiceIcon },
  { label: 'Jobs', href: '/jobs', icon: JobsIcon },
  { label: 'Disputes', href: '/disputes', icon: DisputeIcon },
  { label: 'Reports', href: '/reports', icon: ReportIcon },
  { label: 'Feedback', href: '/feedback', icon: FeedbkIcon },
  { label: 'Team Members', href: '/team-members', icon: TeamIcon },
  { label: 'Settings', href: '/settings', icon: SettingIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#F3F4F6] text-[#757C91] p-4 fixed top-0 left-0">
      <div>
        <DailyHelpLogo className="h-10 w-auto" />
      </div>
      <nav className="flex flex-col gap-2 text-[#757C91] font-medium">
        {sidebarLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <a
              key={href}
              href={href}
              className={`text-[#757C91] flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-white text-[#017441]' : 'hover:bg-white text-[#757C91]'
              }`}
            >
              <Icon className="h-5 w-5 group-hover:text-black" />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
