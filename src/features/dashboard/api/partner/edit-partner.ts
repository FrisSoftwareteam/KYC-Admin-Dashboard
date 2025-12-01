import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';
import { useNavigate } from 'react-router-dom';

export interface UpdatePartner {
  id: string;
  data: any;
}
const editPartner = async (data: UpdatePartner) => {
  const response = await axios.put(
    `partners/${data.id}/update-by-id`,
    data.data
  );
  return response.data;
};

type MutFnType = typeof editPartner;

export const useEditPartnerApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
      navigate(-1);
    },
    retry: false,
    mutationKey: ['edit-partner'],
    mutationFn: editPartner,
    ...config,
  });
};
