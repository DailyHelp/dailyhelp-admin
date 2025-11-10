'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import Icon from '@/assets/service-icon.svg';
import CameraIcon from '@/assets/camera-icon.svg';
import { Trash2, X, Pencil } from 'lucide-react';
import { Button, Input, IconButton } from '@/components/ui';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { useCreateAdminMainCategory } from '@/features/settings/hooks';

interface DraftSubCategory {
  id: string;
  name: string;
}

export interface AddMemberFormProps {
  onSuccess?: () => void;
}

export default function AddMemberForm({ onSuccess }: AddMemberFormProps) {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategoryInput, setSubCategoryInput] = useState('');
  const [subCategories, setSubCategories] = useState<DraftSubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createCategoryMutation = useCreateAdminMainCategory();

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const normalizedMainCategory = mainCategory.trim();
  const disableSaveSubcategory = !subCategoryInput.trim() || loading;
  const isDisabled = loading || !normalizedMainCategory;

  const resetState = () => {
    setMainCategory('');
    setSubCategoryInput('');
    setSubCategories([]);
    setIconPreview(null);
    setIconFile(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    resetState();
    onSuccess?.();
  };

  const handleAddSubCategory = () => {
    const trimmed = subCategoryInput.trim();
    if (!trimmed) return;
    setSubCategories((prev) => [...prev, { id: crypto.randomUUID(), name: trimmed }]);
    setSubCategoryInput('');
  };

  const handleRemoveSubCategory = (id: string) => {
    setSubCategories((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.', { duration: 3000 });
      return;
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    const previewUrl = URL.createObjectURL(file);
    setObjectUrl(previewUrl);
    setIconPreview(previewUrl);
    setIconFile(file);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const removeIcon = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setIconPreview(null);
    setIconFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;

    setLoading(true);
    try {
      let iconUrl: string | undefined;
      if (iconFile) {
        iconUrl = await uploadImageToCloudinary(iconFile);
      }
      await createCategoryMutation.mutateAsync({
        name: normalizedMainCategory,
        icon: iconUrl,
        subCategories: subCategories.map((sub) => ({ name: sub.name })),
      });
      toast.success('Category added', { duration: 2500 });
      resetState();
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to add category.';
      toast.error(message, { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-2 block text-[#757C91] text-sm font-bold mb-1">Main Category</label>
            <div className="flex gap-4 items-center">
              <div className="relative border border-[#D6DBE7] rounded-full bg-[#F9F9FB] p-[.7rem] min-w-[64px] min-h-[64px] flex items-center justify-center">
                {iconPreview ? (
                  <>
                    <img src={iconPreview} alt="Selected icon" className="h-12 w-12 rounded-full object-cover" />
                    <Button
                      type="button"
                      variant="icon"
                      onClick={removeIcon}
                      className="right-[-.3rem] bottom-[-.3rem] absolute !rounded-full !bg-[#F0443A] !p-0 w-5 h-5 flex items-center justify-center"
                    >
                      <X size={15} className="text-white" />
                    </Button>
                    <Button
                      type="button"
                      variant="icon"
                      onClick={openFileDialog}
                      className="right-[-.3rem] top-[-.3rem] absolute !rounded-full !bg-white border border-[#D6DBE7] !p-0 w-5 h-5 flex items-center justify-center text-[#757C91]"
                    >
                      <Pencil size={12} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Icon />
                    <Button
                      type="button"
                      variant="icon"
                      onClick={openFileDialog}
                      className="right-[-.3rem] bottom-[-.3rem] absolute !rounded-full !bg-[#757C91] !p-0 w-6 h-6 flex items-center justify-center"
                    >
                      <CameraIcon />
                    </Button>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
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
            <label className="pb-2 block text-[#757C91] text-sm font-bold mb-1">Subcategories</label>
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                value={subCategoryInput}
                onChange={(e) => setSubCategoryInput(e.target.value)}
                placeholder="Add new subcategory"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              />

              <Button
                type="button"
                disabled={disableSaveSubcategory}
                onClick={handleAddSubCategory}
                variant="primary"
                className={disableSaveSubcategory ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 px-6 text-[#3B4152] font-semibold text-sm">
          {subCategories.length === 0 ? (
            <p className="text-[#A9AFC2] text-sm">No subcategories yet. Add one above.</p>
          ) : (
            subCategories.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center">
                <p>{sub.name}</p>
                <IconButton
                  type="button"
                  onClick={() => handleRemoveSubCategory(sub.id)}
                  className="bg-[#FEF6F6] w-8 h-8 rounded-xl flex items-center justify-center"
                  aria-label={`Delete ${sub.name}`}
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </IconButton>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary" className="p-[11px] text-sm">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className={`p-[11px] rounded-xl text-sm font-bold ${isDisabled ? 'bg-[#E5EAE7FF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#017441] text-white'}`}
            >
              {loading ? 'Adding…' : 'Add category'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
