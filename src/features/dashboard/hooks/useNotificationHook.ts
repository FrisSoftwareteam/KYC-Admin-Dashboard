import { useGetAllNotification } from '../api/get-all-notification';
import { useMarkAsReadApi } from '../api/mark-as-read';

export const useNotificationHook = () => {
  const { data, isLoading, error, refetch } = useGetAllNotification();
  const { mutateAsync: markAllAsRead } = useMarkAsReadApi();

  const handleMarkAllAsRead = async () => {
    const ids = data?.data?.map((item) => item._id);
    await markAllAsRead({ ids: ids });
    await refetch();
  };

  return {
    notifications: data?.data,
    isLoading,
    error,
    handleMarkAllAsRead,
  };
};
