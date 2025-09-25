'use client';
import { useEffect, useMemo, useRef, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { Button, Input } from '@/components/ui';

export interface DeleteCategoryProps {
  categories?: string[];
  onSuccess?: () => void;
}

export default function DeleteCategory({ categories = [], onSuccess }: DeleteCategoryProps) {
  const [reassignTo, setReassignTo] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [openList, setOpenList] = useState<boolean>(false);

  const options = useMemo(() => {
    return Array.from(new Set(categories.filter(Boolean)));
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpenList(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleCancel = () => {
    setReassignTo('');
    onSuccess?.();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reassignTo) return;
    // simulate delete + reassign
    await new Promise((r) => setTimeout(r, 300));
    toast.success('Category deleted and providers reassigned', { duration: 2500 });
    setReassignTo('');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="px-5 py-4">
      <div className="text-[#3B4152] space-y-3">
        <p>
          This category is currently assigned to one or more service providers. To delete it, you
          must reassign all affected providers to a different category.
        </p>
        <div className="pt-2">
          <label className="block text-[#757C91] text-sm font-bold mb-2">Reassign Category</label>
          <div ref={boxRef} className="relative">
            <Button
              type="button"
              onClick={() => setOpenList((v) => !v)}
              className="w-full text-left p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7] text-[#3B4152] flex items-center justify-between"
            >
              <span className={reassignTo ? '' : 'text-[#A9AFC2]'}>
                {reassignTo || 'Select category'}
              </span>
              <span className="text-[#A9AFC2]">▾</span>
            </Button>

            {openList && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#F1F2F4]">
                <div className="p-3 border-b border-[#F1F2F4]">
                  <Input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search category"
                    className="w-full p-[10px] bg-[#F9F9FB] text-sm rounded-lg focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                  />
                </div>
                <div className="max-h-64 overflow-auto py-2">
                  {filtered.length === 0 && (
                    <div className="px-4 py-2 text-[#A9AFC2] text-sm">No results</div>
                  )}
                  {filtered.map((opt) => (
                    <Button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setReassignTo(opt);
                        setOpenList(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F9F9FB] ${reassignTo === opt ? 'text-[#017441] font-semibold' : 'text-[#3B4152]'}`}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-[#F9F9FB] -mx-5 px-6 py-4 flex border-t border-[#F1F2F4]">
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
            disabled={!reassignTo}
            className={`p-[11px] rounded-xl text-sm font-bold ${!reassignTo ? 'bg-[#F5ECECFF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#F0443A] text-white'}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
}
