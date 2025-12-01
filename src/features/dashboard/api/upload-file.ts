import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export const uploadFile = async (data: FormData) => {
  const response = await axios.post<ApiResponse<any>>(
    'uploads/admin/other-module/upload',
    data
  );
  return response.data;
};

type MutationFnType = typeof uploadFile;

export const useUploadFileApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },

    retry: false,
    mutationKey: ['upload-file-verification'],
    mutationFn: uploadFile,
    ...config,
  });
};
