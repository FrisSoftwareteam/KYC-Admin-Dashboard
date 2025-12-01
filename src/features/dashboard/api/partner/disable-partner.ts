import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const disablePartner = async (data: string) => {
  const response = await axios.post('admin/disable-partner', {
    partner: data,
  });
  return response.data;
};

type MutFnType = typeof disablePartner;

export const useDisablePartnerApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['disable-partner'],
    mutationFn: disablePartner,
    ...config,
  });
};
