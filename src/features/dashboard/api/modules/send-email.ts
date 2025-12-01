import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface ISendEmailRequest {
  verificationId: string;
  verifier: string;
}

export const sendEmail = async (data: ISendEmailRequest) => {
  const response = await axios.post<ApiResponse<any>>(
    'admin/verifier/send-mail',
    data
  );
  return response.data;
};

type MutationFnType = typeof sendEmail;

export const useSendEmailApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: (res: any) => {
      toast({
        status: 'success',
        description: res?.data || 'Operation successful',
      });
    },

    retry: false,
    mutationKey: ['send-email'],
    mutationFn: sendEmail,
    ...config,
  });
};
