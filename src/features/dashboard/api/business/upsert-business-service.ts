import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

export interface UpsertBusinessRequest {
  business: string;
  services: Array<any>;
}
const upsertBusiness = async (data: UpsertBusinessRequest) => {
  const response = await axios.post('admin/businesses/services', data);
  return response.data;
};

type MutFnType = typeof upsertBusiness;

export const useUpsertBusinessServicesApi = (
  config?: MutationConfig<MutFnType>
) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['upsert-business'],
    mutationFn: upsertBusiness,
    ...config,
  });
};
