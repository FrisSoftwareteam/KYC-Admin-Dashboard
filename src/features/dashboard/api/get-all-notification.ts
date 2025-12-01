import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { INotification } from '@/shared/interface/notification';

export interface IGetAllNotificationresponse {
  meta: IMeta;
  notification: Array<INotification>;
}

export const getAllNotifications = async () => {
  const response = await axios.get<ApiResponse<any>>(
    `notifications/models/admin?limit=10`
  );
  return response.data;
};

type QueryFnType = typeof getAllNotifications;

export const useGetAllNotification = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-notifications'],
    queryFn: () => getAllNotifications(),
    ...config,
  });
};
