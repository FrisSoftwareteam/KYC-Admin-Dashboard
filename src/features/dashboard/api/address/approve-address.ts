import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const approveAddress = async (data: any) => {
  const response = await axios.post(
    'admin/verifications/addresses/approved',
    data
  );
  return response.data;
};

type MutFnType = typeof approveAddress;

export const useApproveAddressApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['approve-address'],
    mutationFn: approveAddress,
    ...config,
  });
};
