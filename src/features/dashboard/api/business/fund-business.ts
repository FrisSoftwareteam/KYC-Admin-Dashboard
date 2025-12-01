import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

export interface FundBusinessRequest {
  business: string;
  user?: string;
  amount: number;
}
const fundBusiness = async (data: FundBusinessRequest) => {
  const response = await axios.post('admin/businesses/fund-account', data);
  return response.data;
};

type MutFnType = typeof fundBusiness;

export const useFundBusinessServicesApi = (
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
    mutationKey: ['fund-business'],
    mutationFn: fundBusiness,
    ...config,
  });
};
