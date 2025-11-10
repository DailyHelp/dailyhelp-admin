'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { X, Pencil, Trash2 } from 'lucide-react'; // icons
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { SettingsCategoryItem } from '@/types/types';
import {
  useAdminMainCategorySubCategories,
  useUpdateAdminMainCategory,
  useCreateAdminSubCategory,
  useDeleteAdminSubCategory,
} from '@/features/settings/hooks';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import Icon from '@/assets/service-icon.svg';
import CameraIcon from '@/assets/camera-icon.svg';

interface NormalizedSubCategory {
  label: string;
  uuid?: string;
}
type NormalizedSubCategoryWithUuid = NormalizedSubCategory & { uuid: string };

export default function AddMemberForm({
  onSuccess,
  jobs,
  onRequestDeleteCategory,
}: {
  onSuccess?: () => void;
  jobs: SettingsCategoryItem;
  onRequestDeleteCategory?: (job: any) => void;
}) {
  const [mainCategory, setMainCategory] = useState(jobs?.category ?? '');
  const [subCategories, setSubCategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(
    jobs?.iconMissing ? null : jobs?.icon ?? null,
  );
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconRemoved, setIconRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const categoryUuid = jobs?.uuid;
  const {
    data: subCategoriesResponse,
    isLoading: isLoadingSubCategories,
    error: subCategoriesError,
  } = useAdminMainCategorySubCategories(categoryUuid);
  const updateMainCategoryMutation = useUpdateAdminMainCategory();
  const createSubCategoryMutation = useCreateAdminSubCategory();
  const deleteSubCategoryMutation = useDeleteAdminSubCategory(categoryUuid);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteSubCategory, setPendingDeleteSubCategory] = useState<NormalizedSubCategory | null>(null);
  const [alternativeSubCategoryUuid, setAlternativeSubCategoryUuid] = useState('');
  const [alternativeChoices, setAlternativeChoices] = useState<NormalizedSubCategoryWithUuid[]>([]);

  useEffect(() => {
    setMainCategory(jobs?.category ?? '');
    setIconPreview(jobs?.iconMissing ? null : jobs?.icon ?? null);
    setIconRemoved(false);
    setIconFile(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setDeleteModalOpen(false);
    setPendingDeleteSubCategory(null);
    setAlternativeSubCategoryUuid('');
  }, [jobs?.category, jobs?.icon, jobs?.uuid]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const fetchedSubCategories: NormalizedSubCategory[] = useMemo(() => {
    const entries = subCategoriesResponse?.data;
    if (!Array.isArray(entries)) {
      return [];
    }

    const normalized: NormalizedSubCategory[] = [];

    entries.forEach((entry, index) => {
      if (entry == null) {
        return;
      }

      if (typeof entry === 'string') {
        const trimmed = entry.trim();
        const label = trimmed.length > 0 ? trimmed : `Subcategory ${index + 1}`;
        normalized.push({ label, uuid: undefined });
        return;
      }

      if (typeof entry !== 'object') {
        return;
      }

      const source = entry as Record<string, unknown>;

      const labelCandidate =
        (source.name as string | undefined) ??
        (source.title as string | undefined) ??
        (source.label as string | undefined) ??
        (source.description as string | undefined) ??
        `Subcategory ${index + 1}`;

      const label =
        typeof labelCandidate === 'string' && labelCandidate.trim().length > 0
          ? labelCandidate.trim()
          : `Subcategory ${index + 1}`;

      if (!label) {
        return;
      }

      const uuidCandidate =
        (source.uuid as string | undefined) ??
        (source.id as string | undefined) ??
        (source.subCategoryUuid as string | undefined);

      normalized.push({ label, uuid: typeof uuidCandidate === 'string' ? uuidCandidate : undefined });
    });

    return normalized;
  }, [subCategoriesResponse?.data]);

  const fallbackSubCategories = useMemo<NormalizedSubCategory[]>(() => {
    return (jobs?.subCategories ?? []).map((label, index) => ({
      label: label ?? `Subcategory ${index + 1}`,
      uuid: undefined,
    }));
  }, [jobs?.subCategories]);

  const displayedSubCategories =
    fetchedSubCategories.length > 0 ? fetchedSubCategories : fallbackSubCategories;
  const originalName = jobs?.category?.trim() ?? '';
  const normalizedMainCategory = mainCategory.trim();
  const nameChanged = normalizedMainCategory !== originalName;
  const iconChanged = iconRemoved || Boolean(iconFile);
  const hasChanges = nameChanged || iconChanged;
  const isDisabled = loading || !normalizedMainCategory || !hasChanges;
  const disableSave = !subCategories.trim() || !categoryUuid || createSubCategoryMutation.isPending;

  const handleCancel = () => {
    setMainCategory(jobs?.category ?? '');
    setSubCategories('');
    setIconPreview(jobs?.iconMissing ? null : jobs?.icon ?? null);
    setIconRemoved(false);
    setIconFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onSuccess?.(); // close modal
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    setConfirmOpen(true);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmSave = async () => {
    if (isDisabled || !categoryUuid) {
      if (!categoryUuid) {
        toast.error('Unable to determine which category to update.', { duration: 3000 });
      }
      return;
    }
    setLoading(true);
    try {
      let iconUrl: string | undefined;
      if (iconChanged) {
        if (iconFile) {
          iconUrl = await uploadImageToCloudinary(iconFile);
        } else if (iconRemoved) {
          iconUrl = '';
        }
      }

      const payload: Record<string, string> = {};
      if (nameChanged) {
        payload.name = normalizedMainCategory;
      }
      if (iconChanged) {
        payload.icon = iconUrl ?? jobs?.icon ?? '';
      }

      if (Object.keys(payload).length === 0) {
        setConfirmOpen(false);
        setLoading(false);
        return;
      }

      await updateMainCategoryMutation.mutateAsync({
        uuid: categoryUuid,
        payload,
      });
      toast.success('Category updated', { duration: 2500 });
      setConfirmOpen(false);
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update category.';
      toast.error(message, { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubCategory = async () => {
    if (!categoryUuid) {
      toast.error('Please select a category before adding subcategories.', { duration: 3000 });
      return;
    }
    const trimmed = subCategories.trim();
    if (!trimmed) {
      return;
    }
    try {
      await createSubCategoryMutation.mutateAsync({
        name: trimmed,
        mainCategoryUuid: categoryUuid,
      });
      toast.success('Subcategory added', { duration: 2500 });
      setSubCategories('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to add subcategory.';
      toast.error(message, { duration: 3000 });
    }
  };

  const requestSubCategoryDelete = (sub: NormalizedSubCategory) => {
    if (!categoryUuid) {
      toast.error('Unable to determine the main category.', { duration: 3000 });
      return;
    }
    if (!sub.uuid) {
      toast.error('This subcategory cannot be deleted because it lacks an identifier.', {
        duration: 3000,
      });
      return;
    }
    const alternatives = displayedSubCategories.filter(
      (item): item is NormalizedSubCategoryWithUuid =>
        Boolean(item.uuid && item.uuid !== sub.uuid),
    );
    if (alternatives.length === 0) {
      toast.error('Add another subcategory before deleting this one.', { duration: 3000 });
      return;
    }
    setAlternativeChoices(alternatives);
    setAlternativeSubCategoryUuid(alternatives[0]?.uuid ?? '');
    setPendingDeleteSubCategory(sub);
    setDeleteModalOpen(true);
  };

  const handleConfirmDeleteSubCategory = async () => {
    if (!pendingDeleteSubCategory?.uuid || !alternativeSubCategoryUuid) {
      toast.error('Select an alternative subcategory before deleting.', { duration: 3000 });
      return;
    }
    try {
      await deleteSubCategoryMutation.mutateAsync({
        uuid: pendingDeleteSubCategory.uuid,
        payload: { alternativeSubCategoryUuid },
      });
      toast.success('Subcategory deleted', { duration: 2500 });
      setDeleteModalOpen(false);
      setPendingDeleteSubCategory(null);
      setAlternativeChoices([]);
      setAlternativeSubCategoryUuid('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete subcategory.';
      toast.error(message, { duration: 3000 });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
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
    setIconRemoved(false);
  };

  const handleRemoveIcon = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setIconPreview(null);
    setIconFile(null);
    setIconRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
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
      <Modal
        open={deleteModalOpen}
        onOpenChange={(open) => {
          setDeleteModalOpen(open);
          if (!open) {
            setPendingDeleteSubCategory(null);
            setAlternativeSubCategoryUuid('');
            setAlternativeChoices([]);
          }
        }}
        title="Delete subcategory"
      >
        <div className="px-5 py-4 text-[#3B4152] space-y-3">
          <p>
            Removing{' '}
            <span className="font-semibold">{pendingDeleteSubCategory?.label ?? 'this subcategory'}</span>{' '}
            will move any existing assignments to another subcategory. Please select where to move
            them.
          </p>
          <div>
            <label className="block text-sm font-semibold text-[#757C91] mb-1">
              Reassign to
            </label>
            <select
              className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl border border-[#D6DBE7] focus:outline-none"
              value={alternativeSubCategoryUuid}
              onChange={(e) => setAlternativeSubCategoryUuid(e.target.value)}
            >
              {alternativeChoices.map((choice) => (
                <option key={choice.uuid} value={choice.uuid}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <Button
              type="button"
              onClick={() => {
                setDeleteModalOpen(false);
                setPendingDeleteSubCategory(null);
                setAlternativeSubCategoryUuid('');
                setAlternativeChoices([]);
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleConfirmDeleteSubCategory}
              disabled={
                !alternativeSubCategoryUuid ||
                deleteSubCategoryMutation.isPending ||
                !pendingDeleteSubCategory?.uuid
              }
              className={
                !alternativeSubCategoryUuid || deleteSubCategoryMutation.isPending
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }
            >
              {deleteSubCategoryMutation.isPending ? 'Deleting…' : 'Delete'}
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
              <div className="relative flex items-center justify-center border border-[#D6DBE7] rounded-full bg-[#F9F9FB] p-[.4rem] min-w-[56px] min-h-[56px]">
                {iconPreview ? (
                  <>
                    <Image
                      src={iconPreview}
                      alt="Category icon"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                      unoptimized
                    />
                    <Button
                      type="button"
                      variant="icon"
                      onClick={handleRemoveIcon}
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
              />

              <Button
                type="button"
                disabled={disableSave}
                onClick={handleAddSubCategory}
                variant="primary"
                className={disableSave ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {createSubCategoryMutation.isPending ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4 px-6 text-[#3B4152] font-semibold text-sm">
            {isLoadingSubCategories && (
              <p className="text-xs text-[#757C91]">Loading subcategories…</p>
            )}
            {subCategoriesError && (
              <p className="text-xs text-[#EA3829]">
                Unable to load subcategories. Showing cached list instead.
              </p>
            )}
            {displayedSubCategories.map((sub, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{sub.label}</p>
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => requestSubCategoryDelete(sub)}
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
