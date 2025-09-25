'use client';
import { toast } from 'sonner';

export default function Delete({ onSuccess }) {
  const handleCancel = () => {
    onSuccess?.(); // close modal if parent passes onSuccess
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(' Job tip deleted', { duration: 3000 });

    onSuccess?.(); // close modal
  };

  return (
    <div>
      <div className="mb- px-5 py-4 text-[#3B4152] space-y-2">
        <p className="">
          You’re about to delete a job tip. Deleting this job tip will remove it from the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-auto bg-[#F9F9FB] flex border-t border-[#F1F2F4] py-4 px-6">
          <div className="ml-auto space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="p-[11px] rounded-xl bg-[#F1F2F4] border border-[#DADBDEFF] text-[#017441] text-sm font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="p-[11px] rounded-xl text-sm font-bold bg-[#F0443A] text-white cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
