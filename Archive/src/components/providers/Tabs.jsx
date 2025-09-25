'use client';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`py-2 px-4 ${
            activeTab === tab.id ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
