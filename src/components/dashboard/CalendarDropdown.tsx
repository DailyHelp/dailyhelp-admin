'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { subMonths, addMonths, format } from 'date-fns';
import CalendarIcon from '@/assets/calendar-icon.svg';
import DropdownIcon from '@/assets/dropdown-icon.svg';

import LeftArrow from '@/assets/left-icon.svg';
import RightArrow from '@/assets/right-icon.svg';

import { startOfWeek, endOfWeek, subDays, subWeeks } from 'date-fns';
import { Button, IconButton } from '@/components/ui';
import { AdminDashboardDateFilter } from '@/features/dashboard/types';

interface PresetOption {
  label: string;
  filter?: AdminDashboardDateFilter;
  range?: () => { startDate: Date; endDate: Date };
}

const presetOptions: PresetOption[] = [
  {
    label: 'All time',
  },
  {
    label: 'Today',
    filter: AdminDashboardDateFilter.TODAY,
    range: () => ({ startDate: new Date(), endDate: new Date() }),
  },
  {
    label: 'Yesterday',
    filter: AdminDashboardDateFilter.YESTERDAY,
    range: () => {
      const y = subDays(new Date(), 1);
      return { startDate: y, endDate: y };
    },
  },
  {
    label: 'Last 7 days',
    filter: AdminDashboardDateFilter.LAST_7_DAYS,
    range: () => {
      const end = new Date();
      const start = subDays(end, 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last week',
    filter: AdminDashboardDateFilter.LAST_WEEK,
    range: () => {
      const today = new Date();
      const start = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      const end = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This month',
    filter: AdminDashboardDateFilter.THIS_MONTH,
    range: () => {
      const start = new Date();
      start.setDate(1);
      return { startDate: start, endDate: new Date() };
    },
  },
  {
    label: 'Last 30 days',
    filter: AdminDashboardDateFilter.LAST_30_DAYS,
    range: () => {
      const end = new Date();
      const start = subDays(end, 29);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Custom range',
    filter: AdminDashboardDateFilter.CUSTOM,
  },
];

export interface CalendarDropdownProps {
  onDateChange?: (start: Date, end: Date) => void;
  onFilterChange?: (payload: {
    filter?: AdminDashboardDateFilter;
    startDate?: string;
    endDate?: string;
  }) => void;
}

export default function CalendarDropdown({ onDateChange, onFilterChange }: CalendarDropdownProps) {
  const [appliedLabel, setAppliedLabel] = useState('All time');
  const [pendingLabel, setPendingLabel] = useState('All time');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2000, 0, 1),
    endDate: new Date(),
    key: 'selection',
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  const closePopover = useCallback(() => {
    setIsPopoverOpen(false);
    setIsCustomMode(false);
    setPendingLabel(appliedLabel);
  }, [appliedLabel]);

  const openPopover = () => {
    setPendingLabel(appliedLabel);
    setIsPopoverOpen(true);
    const shouldShowCustom = appliedLabel === 'Custom range';
    setIsCustomMode(shouldShowCustom);
    if (shouldShowCustom) {
      setCurrentDate(dateRange.endDate ?? dateRange.startDate ?? new Date());
    }
  };

  const applyPreset = (label: string) => {
    setPendingLabel(label);
    const selectedOption = presetOptions.find((option) => option.label === label);
    if (!selectedOption) {
      return;
    }

    if (selectedOption.filter === AdminDashboardDateFilter.CUSTOM) {
      setIsCustomMode(true);
      setCurrentDate(dateRange.endDate ?? dateRange.startDate ?? new Date());
      return;
    }

    setIsCustomMode(false);

    if (!selectedOption.filter) {
      setAppliedLabel(label);
      closePopover();
      onFilterChange?.({});
      return;
    }

    if (selectedOption.range) {
      const range = selectedOption.range();
      const newRange = { ...range, key: 'selection' };
      setDateRange(newRange);
      setCurrentDate(newRange.endDate ?? newRange.startDate ?? new Date());
      setAppliedLabel(label);
      closePopover();
      onDateChange?.(newRange.startDate, newRange.endDate);
      onFilterChange?.({ filter: selectedOption.filter });
      return;
    }

    setAppliedLabel(label);
    closePopover();
    onFilterChange?.({ filter: selectedOption.filter });
  };

  const applyCustomRange = () => {
    setAppliedLabel('Custom range');
    setPendingLabel('Custom range');
    closePopover();
    onDateChange?.(dateRange.startDate, dateRange.endDate);
    onFilterChange?.({
      filter: AdminDashboardDateFilter.CUSTOM,
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString(),
    });
  };

  useEffect(() => {
    onFilterChange?.({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPopoverOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopoverOpen, closePopover]);

  return (
    <div className="relative w-fit" ref={containerRef}>
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-[#3B4152]">Showing results for</p>
        <button
          type="button"
          onClick={() => {
            if (isPopoverOpen) {
              closePopover();
            } else {
              openPopover();
            }
          }}
          className="flex items-center gap-2 rounded-full border border-[#D6DBE7] bg-white px-4 py-2 text-sm font-semibold text-[#121921] shadow-sm transition hover:border-[#017441] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017441] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <CalendarIcon className="" />
          <span>{appliedLabel}</span>
          <DropdownIcon
            className={`h-3 w-3 text-[#757C91] transition-transform ${
              isPopoverOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isPopoverOpen && (
        <main
          className={`absolute z-50 mt-3 flex flex-col rounded-2xl border border-[#F1F2F4] bg-white text-sm shadow-xl ${
            isCustomMode ? 'w-[503px] p-2' : 'w-[220px] p-2'
          }`}
        >
          <div
            className={`border-b border-[#F1F2F4] pb-2 ${isCustomMode ? 'flex' : 'flex flex-col'}`}
          >
            <div
              className={`flex flex-col space-y-1 ${
                isCustomMode ? 'w-40 border-r border-[#F1F2F4] p-3' : 'p-3'
              }`}
            >
              {presetOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => applyPreset(option.label)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                    pendingLabel === option.label
                      ? 'bg-[#E6FFF4] text-[#017441]'
                      : 'text-[#3B4152] hover:bg-[#F3FCF4]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {isCustomMode && (
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#121921]">
                    {format(currentDate, 'MMMM yyyy')}
                  </span>
                  <div className="flex items-center gap-1">
                    <IconButton
                      onClick={handlePrevMonth}
                      className="cursor-pointer rounded-xl border border-[#D6DBE7] p-2"
                    >
                      <LeftArrow className=" text-gray-600" />
                    </IconButton>
                    <IconButton
                      onClick={handleNextMonth}
                      className="cursor-pointer rounded-xl border border-[#D6DBE7] p-2"
                    >
                      <RightArrow className=" text-gray-600" />
                    </IconButton>
                  </div>
                </div>
                <div className="calendar-wrapper">
                  <DateRange
                    key={currentDate.toISOString()}
                    months={1}
                    direction="horizontal"
                    moveRangeOnFirstSelection={false}
                    ranges={[dateRange]}
                    onChange={(item: any) => setDateRange(item.selection)}
                    showMonthAndYearPickers={false}
                    showMonthArrow={false}
                    showDateDisplay={false}
                    shownDate={currentDate}
                  />
                </div>
              </div>
            )}
          </div>

          {isCustomMode && (
            <div className="flex items-center justify-between px-3 py-3">
              <div className="text-sm font-semibold text-[#121921]">
                {format(dateRange.startDate, 'MMM d, yyyy')} -{' '}
                {format(dateRange.endDate, 'MMM d, yyyy')}
              </div>
              <div className="space-x-2">
                <Button
                  onClick={closePopover}
                  variant="secondary"
                  className="border border-[#D6DBE7] px-[6px] py-1 text-xs font-semibold text-[#017441]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyCustomRange}
                  className="rounded-xl border px-[8px] py-1 text-xs font-semibold text-white bg-[#017441]"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
