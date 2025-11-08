'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import {
  useAdminPermissions,
  useCreateAdminRole,
  useUpdateAdminRole,
} from '@/features/team-members/hooks';
import {
  mapAdminPermissionsToGroups,
  PermissionGroupOption,
} from '@/features/team-members/utils';
import { DEFAULT_PERMISSION_GROUPS } from '@/features/team-members/permission-helpers';

interface AddRoleFormProps {
  onSuccess: () => void;
  initialTitle?: string;
  initialSelectedKeys?: string[];
  submitLabel?: string;
  roleUuid?: string;
}

export default function AddRoleForm({
  onSuccess,
  initialTitle = '',
  initialSelectedKeys,
  submitLabel = 'Save role',
  roleUuid,
}: AddRoleFormProps) {
  const { data: permissionsResponse, isLoading: isLoadingPermissions, error: permissionsError } =
    useAdminPermissions();

  const createRoleMutation = useCreateAdminRole();
  const updateRoleMutation = useUpdateAdminRole();

  const apiPermissionGroups = useMemo(
    () => mapAdminPermissionsToGroups(permissionsResponse?.data ?? []),
    [permissionsResponse],
  );

  const hasApiPermissionData = apiPermissionGroups.length > 0;

  const permissionGroups = useMemo<PermissionGroupOption[]>(() => {
    if (hasApiPermissionData) {
      return apiPermissionGroups;
    }
    return DEFAULT_PERMISSION_GROUPS;
  }, [apiPermissionGroups, hasApiPermissionData]);

  const permissionLookup = useMemo(() => {
    const lookup: Record<
      string,
      {
        uuid?: string;
        parentKey?: string;
        childrenKeys?: string[];
        modulePermissionKey?: string;
        isModulePermission?: boolean;
      }
    > = {};

    permissionGroups.forEach((group) => {
      const childKeys = group.children?.map((child) => child.key) ?? [];
      const modulePermissionKey = group.modulePermissionKey
        ?? group.children?.find((child) => child.isModulePermission)?.key;

      lookup[group.key] = {
        uuid: group.uuid,
        childrenKeys: childKeys,
        modulePermissionKey,
      };

      group.children?.forEach((child) => {
        lookup[child.key] = {
          uuid: child.uuid,
          parentKey: group.key,
          isModulePermission: Boolean(child.isModulePermission),
        };
      });
    });

    return lookup;
  }, [permissionGroups]);

  const initKeys = useMemo(() => initialSelectedKeys ?? [], [roleUuid, initialSelectedKeys]);

  const [roleTitle, setRoleTitle] = useState(initialTitle);
  const [selected, setSelected] = useState<Set<string>>(() => new Set<string>(initKeys));
  const isEditMode = Boolean(roleUuid);
  const isSaving = isEditMode ? updateRoleMutation.isPending : createRoleMutation.isPending;
  const trimmedTitle = useMemo(() => roleTitle.trim(), [roleTitle]);
  const appliedApiSelectionRef = useRef(false);

  useEffect(() => {
    setRoleTitle(initialTitle ?? '');
  }, [initialTitle, roleUuid]);

  useEffect(() => {
    setSelected(new Set<string>(initKeys));
    appliedApiSelectionRef.current = false;
  }, [initKeys, roleUuid]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!hasApiPermissionData) return;
    if (appliedApiSelectionRef.current) return;
    setSelected(new Set<string>(initKeys));
    appliedApiSelectionRef.current = true;
  }, [isEditMode, hasApiPermissionData, initKeys]);

  useEffect(() => {
    setSelected((prev) => {
      const allowed = new Set<string>();
      permissionGroups.forEach((group) => {
        if (group.children && group.children.length > 0) {
          group.children.forEach((child) => {
            if (!hasApiPermissionData || child.uuid) {
              allowed.add(child.key);
            }
          });
        } else if (!hasApiPermissionData || group.uuid) {
          allowed.add(group.key);
        }
      });

      if (allowed.size === 0) {
        return hasApiPermissionData ? new Set<string>() : prev;
      }

      const next = new Set<string>();
      prev.forEach((key) => {
        if (allowed.has(key)) {
          next.add(key);
        }
      });

      if (next.size === prev.size) {
        let identical = true;
        prev.forEach((value) => {
          if (!next.has(value)) {
            identical = false;
          }
        });
        if (identical) {
          const adjusted = new Set<string>(prev);
          prev.forEach((key) => {
            const info = permissionLookup[key];
            const parentKey = info?.parentKey;
            const moduleKey = parentKey ? permissionLookup[parentKey]?.modulePermissionKey : undefined;
            if (!info?.isModulePermission && moduleKey && permissionLookup[moduleKey]) {
              adjusted.add(moduleKey);
            }
          });
          return adjusted;
        }
      }

      next.forEach((key) => {
        const info = permissionLookup[key];
        const parentKey = info?.parentKey;
        const moduleKey = parentKey ? permissionLookup[parentKey]?.modulePermissionKey : undefined;
        if (!info?.isModulePermission && moduleKey && permissionLookup[moduleKey]) {
          next.add(moduleKey);
        }
      });
      return next;
    });
  }, [permissionGroups, hasApiPermissionData, permissionLookup]);

  const selectedKeys = useMemo(() => Array.from(selected), [selected]);

  const selectedPermissionUuids = useMemo(() => {
    const uuids = new Set<string>();
    selectedKeys.forEach((key) => {
      const uuid = permissionLookup[key]?.uuid;
      if (uuid) {
        uuids.add(uuid);
      }
    });
    return Array.from(uuids);
  }, [selectedKeys, permissionLookup]);

  const isLoadingPermissionsList = isLoadingPermissions && !hasApiPermissionData;

  const isDisabled = useMemo(() => {
    if (!trimmedTitle || isSaving || isLoadingPermissionsList) {
      return true;
    }
    if (!isEditMode && selectedPermissionUuids.length === 0) {
      return true;
    }
    return false;
  }, [trimmedTitle, isSaving, isLoadingPermissionsList, isEditMode, selectedPermissionUuids.length]);

  const setMany = (keys: string[], check: boolean) => {
    setSelected((prev) => {
      const next = new Set<string>(prev);
      keys.forEach((key) => {
        const canSelect = !hasApiPermissionData || Boolean(permissionLookup[key]?.uuid);
        if (!canSelect) {
          return;
        }
        if (check) next.add(key);
        else next.delete(key);
      });
      return next;
    });
  };

  const allChildKeys = (group: PermissionGroupOption) => group.children?.map((c) => c.key) ?? [];
  const groupState = (group: PermissionGroupOption) => {
    const kids = allChildKeys(group);
    if (kids.length === 0) return { checked: selected.has(group.key), indeterminate: false };
    const selectedCount = kids.filter((k) => selected.has(k)).length;
    return {
      checked: selectedCount === kids.length && kids.length > 0,
      indeterminate: selectedCount > 0 && selectedCount < kids.length,
    };
  };

  const ParentCheckbox = ({ group }: { group: PermissionGroupOption }) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const { checked, indeterminate } = groupState(group);
    const hasChildren = group.children && group.children.length > 0;
    const hasSelectableChildren = hasChildren
      ? group.children.some((child) => !hasApiPermissionData || Boolean(permissionLookup[child.key]?.uuid))
      : false;
    const canSelectGroup = hasChildren
      ? hasSelectableChildren
      : !hasApiPermissionData || Boolean(group.uuid);
    const disabled = isLoadingPermissionsList || !canSelectGroup;

    useEffect(() => {
      if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const willCheck = e.target.checked;
      const kids = allChildKeys(group);
      if (kids.length === 0) {
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
          disabled={disabled}
        />
        <span className="font-medium">{group.label}</span>
      </label>
    );
  };

  const ChildCheckbox = ({
    perm,
  }: {
    perm: { key: string; label?: string; uuid?: string; isModulePermission?: boolean };
  }) => {
    const checked = selected.has(perm.key);
    const canSelect = !hasApiPermissionData || Boolean(permissionLookup[perm.key]?.uuid);
    const disabled = isLoadingPermissionsList || !canSelect;

    const onChange = () => {
      if (disabled) return;
      setSelected((prev) => {
        const next = new Set<string>(prev);
        const info = permissionLookup[perm.key];
        const parentKey = info?.parentKey;
        const modulePermissionKey = parentKey ? permissionLookup[parentKey]?.modulePermissionKey : undefined;

        if (!info) {
          if (checked) next.delete(perm.key);
          else next.add(perm.key);
          return next;
        }

        if (checked) {
          next.delete(perm.key);

          if (info?.isModulePermission && parentKey) {
            const siblingKeys = (permissionLookup[parentKey]?.childrenKeys ?? []).filter((key) => key !== perm.key);
            const siblingsSelected = siblingKeys.some((key) => next.has(key));
            if (siblingsSelected) {
              next.add(perm.key);
            }
          } else if (parentKey && modulePermissionKey) {
            const siblingKeys = (permissionLookup[parentKey]?.childrenKeys ?? []).filter(
              (key) => key !== modulePermissionKey && key !== perm.key,
            );
            const siblingsSelected = siblingKeys.some((key) => next.has(key));
            if (!siblingsSelected) {
              next.delete(modulePermissionKey);
            }
          }
        } else {
          next.add(perm.key);
          if (!info?.isModulePermission && modulePermissionKey && permissionLookup[modulePermissionKey]) {
            next.add(modulePermissionKey);
          }
        }
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
          disabled={disabled}
        />
        <span>{perm.label ?? 'Permission'}</span>
      </label>
    );
  };

  const handleCancel = () => {
    setRoleTitle('');
    setSelected(new Set<string>());
    onSuccess?.();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isDisabled) return;

    if (isEditMode && roleUuid) {
      try {
        await updateRoleMutation.mutateAsync({
          uuid: roleUuid,
          payload: {
            name: trimmedTitle,
            description: undefined,
            permissionUuids: selectedPermissionUuids,
          },
        });
        toast.success('Role updated', { duration: 2500 });
        onSuccess?.();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update role.';
        toast.error(message, { duration: 3000 });
      }
      return;
    }

    if (selectedPermissionUuids.length === 0) {
      toast.error('Select at least one permission before saving', { duration: 3000 });
      return;
    }

    try {
      await createRoleMutation.mutateAsync({
        name: trimmedTitle,
        description: undefined,
        permissionUuids: selectedPermissionUuids,
      });
      toast.success('Role added', { duration: 2500 });
      setRoleTitle('');
      setSelected(new Set<string>());
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create role.';
      toast.error(message, { duration: 3000 });
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
            {isLoadingPermissionsList && (
              <p className="text-xs text-[#757C91]">Loading permissions...</p>
            )}
            {permissionsError && (
              <p className="text-xs text-[#EA3829]">
                Unable to load permissions from the server. Showing defaults instead.
              </p>
            )}
            <div className="space-y-4">
              {permissionGroups.map((group) => (
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
              {isSaving ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
