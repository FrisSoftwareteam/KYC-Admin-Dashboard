import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import { ApiResponse } from '@/shared/interface/api';

const exportVerifications = async (businessId?: string) => {
  const baseUrl = '/admin/verifications/export';
  const apiUrl = buildUrlWithQueryParams(baseUrl, { businessId });
  const response = await axios.get<ApiResponse<any>>(apiUrl);
  return response.data;
};

type MutFnType = typeof exportVerifications;

export const useExportVerificationMutation = (
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
    mutationKey: ['export-verifications-admin'],
    mutationFn: exportVerifications,
    ...config,
  });
};
