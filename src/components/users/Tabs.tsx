'use client';

import Button from '@/components/ui/Button';

export interface TabItem {
  id: string;
  label: string;
}
export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-4 border-b">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          variant="secondary"
          className={`!bg-transparent !border-0 py-2 px-4 rounded-none ${
            activeTab === tab.id ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
