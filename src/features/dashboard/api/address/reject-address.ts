import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const rejectAddress = async (data: any) => {
  const response = await axios.post(
    'admin/verifications/addresses/reject',
    data
  );
  return response.data;
};

type MutFnType = typeof rejectAddress;

export const useRejectAddressApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['reject-address'],
    mutationFn: rejectAddress,
    ...config,
  });
};
