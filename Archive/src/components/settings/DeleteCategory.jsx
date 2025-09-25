'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function DeleteCategory({ categories = [], onSuccess }) {
  const [reassignTo, setReassignTo] = useState('');
  const [query, setQuery] = useState('');
  const [openList, setOpenList] = useState(false);

  const options = useMemo(() => {
    return Array.from(new Set(categories.filter(Boolean)));
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  const boxRef = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpenList(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleCancel = () => {
    setReassignTo('');
    onSuccess?.();
  };

  const handleSubmit = async (e) => {
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
            <button
              type="button"
              onClick={() => setOpenList((v) => !v)}
              className="w-full text-left p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7] text-[#3B4152] flex items-center justify-between"
            >
              <span className={reassignTo ? '' : 'text-[#A9AFC2]'}>
                {reassignTo || 'Select category'}
              </span>
              <span className="text-[#A9AFC2]">▾</span>
            </button>

            {openList && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#F1F2F4]">
                <div className="p-3 border-b border-[#F1F2F4]">
                  <input
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
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setReassignTo(opt);
                        setOpenList(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F9F9FB] ${reassignTo === opt ? 'text-[#017441] font-semibold' : 'text-[#3B4152]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-[#F9F9FB] -mx-5 px-6 py-4 flex border-t border-[#F1F2F4]">
        <div className="ml-auto space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#F1F2F4] text-[#017441] text-sm font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!reassignTo}
            className={`p-[11px] rounded-xl text-sm font-bold ${!reassignTo ? 'bg-[#F5ECECFF] text-[#A9AFC2] cursor-not-allowed' : 'bg-[#F0443A] text-white'}`}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
}
