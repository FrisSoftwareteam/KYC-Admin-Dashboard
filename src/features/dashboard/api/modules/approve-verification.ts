import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface IApproveOtherVerificationRequest {
  verificationId: string;
  approved: boolean;
}

export const approveOtherVerification = async (
  data: IApproveOtherVerificationRequest
) => {
  const response = await axios.post<ApiResponse<any>>(
    'admin/other-verifications/approve',
    data
  );
  return response.data;
};

type MutationFnType = typeof approveOtherVerification;

export const useApproveOtherVerificationApi = (
  config?: MutationConfig<MutationFnType>
) => {
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
    mutationKey: ['approve-other-verification'],
    mutationFn: approveOtherVerification,
    ...config,
  });
};
