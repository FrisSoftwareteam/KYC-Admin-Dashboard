import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

import { IAddCandidate } from '../../types/verifications/add-candidate';

export const addCandidate = async (data: IAddCandidate) => {
  const response = await axios.post<ApiResponse<any>>(
    'businesses/candidates/create-by-form',
    data
  );
  return response.data;
};

type MutationFnType = typeof addCandidate;

export const useAddCandidateApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },

    retry: false,
    mutationKey: ['add-candidate-by-form'],
    mutationFn: addCandidate,
    ...config,
  });
};
