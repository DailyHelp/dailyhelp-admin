import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function AddTipForm({ onSuccess, tip }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = !title || !description || loading;

  // 🔑 Keep state in sync when editing
  useEffect(() => {
    if (tip) {
      setTitle(tip.jobTips.title || '');
      setDescription(tip.jobTips.description || '');
    }
  }, [tip]);

  const handleCancel = () => {
    if (!tip) {
      setTitle('');
      setDescription('');
    }
    onSuccess?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      toast.success(tip ? 'Saved changes' : 'Tip added', { duration: 2500 });
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="px-6 py-6 space-y-3">
        <div>
          <label className="block text-[#757C91] text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Get more clients"
            className="w-full p-[12px] text-[14px] bg-[#F9F9FB] font-bold text-[#3B4152] rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
            required
          />
        </div>

        <div>
          <label className="flex justify-between text-[#757C91] text-sm font-semibold mb-1">
            Description
            <span className="text-[#757C91] text-xs font-normal">{description.length}/60</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description..."
            maxLength={60}
            rows={4}
            className="w-full p-[12px] bg-[#F9F9FB] text-[14px] font-bold text-[#3B4152] rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7] resize-none"
            required
          />
        </div>
      </div>

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
            {loading ? (tip ? 'saving...' : 'Adding...') : tip ? 'Save changes' : 'Add tip'}
          </button>
        </div>
      </div>
    </form>
  );
}
