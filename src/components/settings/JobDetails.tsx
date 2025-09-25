'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import Icon from '@/assets/service-icon.svg';
import CameraIcon from '@/assets/camera-icon.svg';
import { X, Pencil, Trash2 } from 'lucide-react'; // icons
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AddMemberForm({
  onSuccess,
  jobs,
  onRequestDeleteCategory,
}: {
  onSuccess?: () => void;
  jobs: { icon: string; subCategories: string[] };
  onRequestDeleteCategory?: (job: any) => void;
}) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    // Open confirmation modal only
    setConfirmOpen(true);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmSave = async () => {
    if (isDisabled) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      toast.success('Changes saved', { duration: 2500 });
      setConfirmOpen(false); // close confirmation modal
      onSuccess?.(); // now close parent modal
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      {/* Update confirmation modal */}
      <Modal open={confirmOpen} onOpenChange={setConfirmOpen} title="Update category">
        <div className="px-5 py-4 text-[#3B4152] space-y-3">
          <p>
            You’re about to save changes to service categories. These changes will affect categories
            currently assigned to service providers, existing jobs, and filters.
          </p>
          <p>Please review carefully before proceeding.</p>
        </div>
        <div className="bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={() => setConfirmOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmSave}
              className={loading ? 'opacity-80 cursor-not-allowed' : ''}
            >
              {loading ? 'saving...' : 'Save changes'}
            </Button>
          </div>
        </div>
      </Modal>

      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label htmlFor="mainCategory" className="pb-2 block text-[#757C91] text-sm font-bold mb-1">
              Main Category
            </label>
            <div className="flex gap-4 items-center">
              <div className="relative border border-[#D6DBE7] rounded-full  p-[.4rem]">
                <Image
                  src={jobs.icon}
                  alt="attachment"
                  width={35}
                  height={35}
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="icon"
                  className="right-[-.2rem] bottom-[-.2rem] absolute !rounded-full !bg-[#F0443A] !p-0 w-5 h-5 flex items-center justify-center"
                >
                  <X size={15} className="text-white" />
                </Button>
              </div>

              <Input
                id="mainCategory"
                type="text"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
          </div>

          <div className="border-b border-[#F1F2F4] pb-6">
            <label htmlFor="subcategory" className="pb-2 block text-[#757C91] text-sm font-bold mb-1">
              Subcategories
            </label>
            <div className="flex gap-4 items-center">
              <Input
                id="subcategory"
                type="text"
                value={subCategories}
                onChange={(e) => setSubCategories(e.target.value)}
                placeholder="Add new subcategory"
                required
              />

              <Button
                disabled={disableSave}
                variant="secondary"
                className={disableSave ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4 px-6 text-[#3B4152] font-semibold text-sm">
            {jobs.subCategories.map((sub, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{sub}</p>
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => onRequestDeleteCategory?.(jobs)}
                  className="!bg-[#FEF6F6] !p-0 w-8 h-8 rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary" aria-label="Cancel and close">
              Cancel
            </Button>
            <Button type="submit" disabled={isDisabled} aria-busy={isDisabled && loading ? true : undefined} aria-label="Save changes">
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
