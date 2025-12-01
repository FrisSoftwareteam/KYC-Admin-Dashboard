import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const sendBulk = async (data: any) => {
  const response = await axios.post('admin/addresses/partners/attach', data);
  return response.data;
};

type MutFnType = typeof sendBulk;

export const useSendBulkApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['send-bulk'],
    mutationFn: sendBulk,
    ...config,
  });
};
