import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export const uploadImage = async (data: FormData) => {
  const response = await axios.post<ApiResponse<any>>(
    'uploads/candidates/picture',
    data
  );
  return response.data;
};

type MutationFnType = typeof uploadImage;

export const useUploadCandidateImageApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();
  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },

    retry: false,
    mutationKey: ['upload-candidate-verification'],
    mutationFn: uploadImage,
    ...config,
  });
};
