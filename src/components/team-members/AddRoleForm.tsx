'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface AddRoleFormProps {
  onSuccess: () => void;
  initialTitle?: string; // optional
  initialSelectedKeys?: string[]; // optional
  submitLabel?: string; // optional
}

// Grouped permissions with optional child permissions
const PERMISSION_GROUPS = [
  { key: 'dashboard', label: 'Dashboard' },
  {
    key: 'users',
    label: 'Users',
    children: [{ key: 'users.suspend', label: 'Permission to Suspend/Unsuspend user' }],
  },
  {
    key: 'providers',
    label: 'Service providers',
    children: [{ key: 'providers.suspend', label: 'Permission to  Suspend/Unsuspend providers' }],
  },
  { key: 'jobs', label: 'Jobs' },
  {
    key: 'disputes',
    label: 'Disputes',
    children: [{ key: 'disputes.resolve', label: 'Permission to resolve disputes' }],
  },
  {
    key: 'reports',
    label: 'Reports',
    children: [{ key: 'reports.resolve', label: 'Permission to resolve reports' }],
  },
  { key: 'feedback', label: 'Feedback' },
  {
    key: 'team',
    label: 'Team members',
    children: [
      { key: 'team.manage', label: 'Permission to add/remove team members' },
      { key: 'team.edit-role', label: 'Permission to edit team member role' },
      { key: 'team.roles.manage', label: 'Permission to add/remove roles' },
      { key: 'team.roles.edit', label: 'Permission to edit roles' },
    ],
  },
  { key: 'settings', label: 'Settings' },
];

export default function AddRoleForm({
  onSuccess,
  initialTitle = '',
  initialSelectedKeys = [],
  submitLabel = 'Save role',
}: AddRoleFormProps) {
  const [roleTitle, setRoleTitle] = useState('');
  // Track only leaf selections (children). Parents will reflect based on children.
  const [selected, setSelected] = useState(new Set());
  const [saving, setSaving] = useState(false);

  const totalSelected = selected.size;
  const isDisabled = useMemo(
    () => !roleTitle.trim() || saving || totalSelected === 0,
    [roleTitle, saving, totalSelected],
  );

  // Stable fallbacks for initial values (prevents infinite effects)
  const initTitle = initialTitle ?? '';
  const initKeys = useMemo(() => initialSelectedKeys ?? [], [initialSelectedKeys]);

  // Pre-fill when opening or when parent changes values
  useEffect(() => {
    setRoleTitle(initTitle);
    setSelected(new Set(initKeys));
  }, [initTitle, initKeys]);

  const setMany = (keys: string[], check: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      keys.forEach((k) => {
        if (check) next.add(k);
        else next.delete(k);
      });
      return next;
    });
  };

  const allChildKeys = (group: { children?: { key: string }[]; key: string }) =>
    group.children?.map((c) => c.key) ?? [];
  const groupState = (group: { children?: { key: string }[]; key: string }) => {
    const kids = allChildKeys(group);
    if (kids.length === 0) return { checked: selected.has(group.key), indeterminate: false };
    const selectedCount = kids.filter((k) => selected.has(k)).length;
    return {
      checked: selectedCount === kids.length && kids.length > 0,
      indeterminate: selectedCount > 0 && selectedCount < kids.length,
    };
  };

  const ParentCheckbox = ({
    group,
  }: {
    group: { key: string; label: string; children?: { key: string; label?: string }[] };
  }) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const { checked, indeterminate } = groupState(group);

    useEffect(() => {
      if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const willCheck = e.target.checked;
      const kids = allChildKeys(group);
      if (kids.length === 0) {
        // Standalone top-level permission
        setMany([group.key], willCheck);
      } else {
        setMany(kids, willCheck);
      }
    };

    return (
      <label className="flex items-center gap-3 text-[#3B4152] text-sm">
        <input
          ref={ref}
          type="checkbox"
          className="h-5 w-5 rounded-lg border-[#D6DBE7] accent-[#017441] focus:ring-0 focus:outline-none"
          checked={checked}
          onChange={onChange}
        />
        <span className="font-medium">{group.label}</span>
      </label>
    );
  };

  const ChildCheckbox = ({ perm }: { perm: { key: string; label?: string } }) => {
    const checked = selected.has(perm.key);
    const onChange = () => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (checked) next.delete(perm.key);
        else next.add(perm.key);
        return next;
      });
    };
    return (
      <label className="flex items-center gap-3 text-[#3B4152] text-sm">
        <input
          type="checkbox"
          className="h-5 w-5 rounded-lg border-[#D6DBE7] accent-[#017441] focus:ring-0 focus:outline-none"
          checked={checked}
          onChange={onChange}
        />
        <span>{perm.label}</span>
      </label>
    );
  };

  const handleCancel = () => {
    setRoleTitle('');
    setSelected(new Set());
    onSuccess?.();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isDisabled) return;
    setSaving(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 700));
      toast.success('Role added', { duration: 2500 });
      onSuccess?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-[#757C91] text-sm font-bold mb-1">Role</label>
            <Input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="Enter role title"
              className="w-full font-semibold text-[#6D6E70FF] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent "
            />
          </div>

          <div>
            <p className="text-[#3B4152] text-sm font-bold mb-2">Select permissions</p>
            <div className="space-y-4">
              {PERMISSION_GROUPS.map((group) => (
                <div key={group.key} className="space-y-2">
                  <ParentCheckbox group={group} />
                  {group.children && group.children.length > 0 && (
                    <div className="pl-4 ml-[6px] border-l border-[#E6E9F0] space-y-2">
                      {group.children.map((perm) => (
                        <ChildCheckbox key={perm.key} perm={perm} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto bg-[#F9F9FB] px-5 py-6 flex border-t border-[#F1F2F4]">
          <div className="ml-auto space-x-4">
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className={isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {saving ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
