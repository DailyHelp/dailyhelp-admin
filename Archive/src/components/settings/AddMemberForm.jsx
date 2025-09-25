'use client';

import { useState } from 'react';
import { TEAM_ROLES } from '@/data/teamMembersDummyData';
import { toast } from 'sonner';
import Icon from '@/assets/service-icon.svg';
import CameraIcon from '@/assets/camera-icon.svg';
import { ChevronsUpDown, Pencil, Trash2 } from 'lucide-react'; // icons

export default function AddMemberForm({ onSuccess, jobs, onRequestDeleteCategory }) {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategories, setSubCategories] = useState('');

  const [loading, setLoading] = useState(false);

  const isDisabled = !subCategories || !mainCategory || loading;
  const disableSave = !subCategories;

  const handleCancel = () => {
    setMainCategory('');
    setSubCategories('');
    onSuccess?.(); // close modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    try {
      // Simulate request
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Category added', { duration: 2500 });
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-2 block text-[#757C91] text-sm font-bold mb-1">
              Main Category
            </label>
            <div className="flex gap-4 items-center">
              <div className="relative border border-[#D6DBE7] rounded-full bg-[#F9F9FB] p-[.7rem]">
                <Icon />
                <button className="right-[-.8rem] bottom-[-.2rem] absolute  border border-[#3B4152] rounded-full bg-[#757C91] p-[.3rem]">
                  <CameraIcon />
                </button>
              </div>

              <input
                type="text"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />
            </div>
          </div>

          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-2 block text-[#757C91] text-sm font-bold mb-1">
              Subcategories
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={subCategories}
                onChange={(e) => setSubCategories(e.target.value)}
                placeholder="Add new subcategory"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />

              <button
                disabled={disableSave}
                className={`p-[11px] text-sm font-bold ${disableSave ? ' text-[#A9AFC2] cursor-not-allowed' : ' text-[#017441]'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Existing subcategories list with delete buttons */}
        {Array.isArray(jobs) && jobs.length > 0 && (
          <div className="space-y-4 px-6 text-[#3B4152] font-semibold text-sm">
            {(jobs[0]?.subCategories || []).slice(0, 6).map((sub, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{sub}</p>
                <button
                  type="button"
                  onClick={() => onRequestDeleteCategory?.(sub)}
                  className="bg-[#FEF6F6] w-8 h-8 rounded-xl flex items-center justify-center"
                  aria-label={`Delete ${sub}`}
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#F1F2F4] text-[#A9AFC2] text-sm font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDisabled}
              className={`p-[11px] rounded-xl text-sm font-bold ${isDisabled ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#017441] text-white'}`}
            >
              {loading ? 'adding...' : 'Add category'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
