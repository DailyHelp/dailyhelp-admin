'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import Icon from '@/assets/service-icon.svg';
import CameraIcon from '@/assets/camera-icon.svg';
import { Trash2 } from 'lucide-react';
import { Button, Input, IconButton } from '@/components/ui';
import type { SettingsCategoryItem } from '@/types/types';

export interface AddMemberFormProps {
  onSuccess?: () => void;
  jobs?: SettingsCategoryItem[];
  onRequestDeleteCategory?: (subcategory: string) => void;
}

export default function AddMemberForm({
  onSuccess,
  jobs,
  onRequestDeleteCategory,
}: AddMemberFormProps) {
  const [mainCategory, setMainCategory] = useState<string>('');
  const [subCategories, setSubCategories] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isDisabled = !subCategories || !mainCategory || loading;
  const disableSave = !subCategories;

  const handleCancel = () => {
    setMainCategory('');
    setSubCategories('');
    onSuccess?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    try {
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
                <IconButton className="right-[-.8rem] bottom-[-.2rem] absolute border border-[#3B4152] rounded-full bg-[#757C91] p-[.3rem]">
                  <CameraIcon />
                </IconButton>
              </div>

              <Input
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
              <Input
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

        {Array.isArray(jobs) && jobs.length > 0 && (
          <div className="space-y-4 px-6 text-[#3B4152] font-semibold text-sm">
            {(jobs[0]?.subCategories || []).slice(0, 6).map((sub, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{sub}</p>
                <IconButton
                  type="button"
                  onClick={() => onRequestDeleteCategory?.(sub)}
                  className="bg-[#FEF6F6] w-8 h-8 rounded-xl flex items-center justify-center"
                  aria-label={`Delete ${sub}`}
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </IconButton>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="p-[11px] text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className={`p-[11px] rounded-xl text-sm font-bold ${isDisabled ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#017441] text-white'}`}
            >
              {loading ? 'adding...' : 'Add category'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
