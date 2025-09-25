import React from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (v?: any) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 text-xs text-[#757C91] cursor-pointer">
      {label}
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange as any}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-[#017441] transition-colors" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
      </div>
    </label>
  );
};

export default Toggle;
