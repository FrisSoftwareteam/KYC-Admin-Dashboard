import { Permissions } from '@/data/permission';

export const useManageAccessHook = ({ onClose }: { onClose: () => void }) => {
  const handleSubmit = () => {
    onClose();
  };

  const permissionsData = Object.keys(Permissions)?.map((item, i) => ({
    id: i,
    name: item,
    value: Permissions[item],
  }));

  return {
    permissionsData,
    handleSubmit,
  };
};
