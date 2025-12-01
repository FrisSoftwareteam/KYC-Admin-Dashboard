import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export const sumbitVerification = async (data: any) => {
  const response = await axios.post<ApiResponse<any>>(
    'admin/verifier/submit-verification',
    data
  );
  return response.data;
};

type MutationFnType = typeof sumbitVerification;

export const useSumbitVerificationApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['submit-verifier-verification'],
    mutationFn: sumbitVerification,
    ...config,
  });
};
