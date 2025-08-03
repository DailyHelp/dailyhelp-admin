import CalendarDropdown from '@/components/dashboard/CalendarDropdown';
import DashboardStats from '@/components/dashboard/DashboardStats';
import OverviewSection from '@/components/dashboard/OverviewSect';
import ReportSection from '@/components/dashboard/ReportSect';
// import FeedbackSection from '@/components/dashboard/FeedbackSection';

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 bg-gray-50">
      <div className="">
        <CalendarDropdown />
      </div>

      <DashboardStats />
      <OverviewSection />
      <ReportSection />
      
    </main>
  );
}
