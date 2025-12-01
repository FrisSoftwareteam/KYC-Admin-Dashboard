import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

export interface AddPartnerRequest {
  partnerName: string;
  email: string;
  address: string;
  countryCode: string;
  phoneNumber: any;
  cacNumber: string;
  directorNin: string;
}
const addPartner = async (data: AddPartnerRequest) => {
  const response = await axios.post('partners/invite', data);
  return response.data;
};

type MutFnType = typeof addPartner;

export const useAddPartnerApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['add-partner'],
    mutationFn: addPartner,
    ...config,
  });
};
