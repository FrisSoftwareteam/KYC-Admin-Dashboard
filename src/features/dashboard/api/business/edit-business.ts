import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';
import { useNavigate } from 'react-router-dom';

export interface UpsertBusinessRequest {
  id: string;
  data: any;
}
const editBusiness = async (data: UpsertBusinessRequest) => {
  const response = await axios.put(
    `businesses/${data.id}/update-by-id`,
    data.data
  );
  return response.data;
};

type MutFnType = typeof editBusiness;

export const useEditBusinessApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
      navigate('/business');
    },
    retry: false,
    mutationKey: ['edit-business'],
    mutationFn: editBusiness,
    ...config,
  });
};
