import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

export interface AddBusinessRequest {
  businessName: string;
  email: string;
  address: string;
  cacNumber: string;
  directorNin: string;
  countryCode: string;
  industry: string;
  phoneNumber: string;
}
const addBusiness = async (data: AddBusinessRequest) => {
  const response = await axios.post('businesses/invite', data);
  return response.data;
};

type MutFnType = typeof addBusiness;

export const useAddBusinessApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['add-business'],
    mutationFn: addBusiness,
    ...config,
  });
};
