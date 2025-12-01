import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export const uploadBulkFile = async (data: FormData) => {
  const response = await axios.post<ApiResponse<any>>(
    'uploads/bulk/upload',
    data
  );
  return response.data;
};

type MutationFnType = typeof uploadBulkFile;

export const useUploadBulkFile = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },

    retry: false,
    mutationKey: ['upload-bulk-file'],
    mutationFn: uploadBulkFile,
    ...config,
  });
};
