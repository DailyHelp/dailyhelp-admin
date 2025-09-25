import CalendarDropdown from '@/components/dashboard/CalendarDropdown';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OverviewSection from '@/components/dashboard/OverviewSect';
import ReportSection from '@/components/dashboard/ReportSect';

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 bg-[#F9F9FB]">
      <div className="">
        <CalendarDropdown />
      </div>

      <DashboardStats />
      <OverviewSection />
      <ReportSection />
    </main>
  );
}
