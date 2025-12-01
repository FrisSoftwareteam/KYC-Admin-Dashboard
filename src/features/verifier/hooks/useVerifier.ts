import { useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useGetVerificationByIdApi } from '@/features/dashboard/api/verifications/get-verification-by-id';
import { useToast } from '@/hooks/useToast';
import { useUploadFileApi } from '@/features/dashboard/api/upload-file';
import { useSumbitVerificationApi } from '@/features/dashboard/api/verifications/submit-verifier-verification';

type inputType = 'input' | 'file';

type Tpayload = {
  type: inputType;
  key: string;
  value: string | File;
  id: number;
};

export const useVerifierHook = () => {
  const toast = useToast();
  const [params] = useSearchParams();
  const id = params.get('verifierId');
  const { data } = useGetVerificationByIdApi(id as string, {
    enabled: Boolean(id),
  });
  const { mutateAsync, isLoading } = useSumbitVerificationApi();
  const { mutateAsync: UCIapi, isLoading: UCILoading } = useUploadFileApi();
  const [payload, setPayload] = useState<Array<Tpayload>>([
    { type: 'input', key: '', value: '', id: 0 },
    { type: 'file', key: '', value: '', id: 1 },
  ]);

  const handleFormSubmit = async (status: 'verify' | 'failed') => {
    try {
      const validPayload = payload.filter((item) => {
        if (typeof item.value === 'string') {
          return item.value.trim() !== '';
        }
        if (item.value instanceof File) {
          return item.value.size > 0;
        }
        return false;
      });

      if (validPayload.length === 0) {
        return toast({
          status: 'error',
          description: 'Please provide at least one valid comment.',
        });
      }

      for (const item of validPayload) {
        if (!item.key) {
          return toast({
            status: 'error',
            description: `Please add key to "${item.value}"`,
          });
        }
      }

      const processedPayload = await Promise.all(
        validPayload.map(async (item) => {
          if (item.value instanceof File) {
            const fileType = item.value.type.startsWith('image/')
              ? 'image'
              : item.value.type.startsWith('application/pdf')
                ? 'file'
                : 'other';

            const form = new FormData();
            form.append(fileType, item.value);

            const { data } = await UCIapi(form);
            return { key: item.key, value: data?.url };
          }
          return { key: item.key, value: item.value };
        })
      );

      const formattedValues = processedPayload.reduce(
        (acc, item) => {
          acc[item.key] = item.value;
          return acc;
        },
        {} as Record<string, any>
      );

      // Submit the data
      await mutateAsync({
        verificationId: id,
        responseObject: formattedValues,
        status,
      } as any);
    } catch (error) {
      // console.error(error.message);
      toast({
        status: 'error',
        description: 'An error occurred while processing your request.',
      });
    }
  };

  const handlePayload = (type: inputType, id?: number) => {
    if (id) {
      return setPayload((prev) => prev.filter((item) => item.id !== id));
    }
    setPayload((prev) => [
      ...prev,
      { type, key: '', value: '', id: prev?.length + 1 },
    ]);
  };

  const handleInput = (
    prop: string | File,
    id: number,
    type: 'key' | 'value'
  ) => {
    setPayload((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [type]: prop } : item))
    );
  };

  const info = useMemo(() => {
    const key = data?.data?.verificationType;
    const selectedData = data?.data?.[key];

    if (!selectedData || typeof selectedData !== 'object') return [];

    const flattenObject = (obj: Record<string, any>, prefix = '') => {
      return Object.entries(obj).flatMap(([k, v]) =>
        typeof v === 'object' && v !== null
          ? flattenObject(v, `${prefix}${k} `)
          : [{ key: `${prefix}${k}`, value: String(v) }]
      );
    };

    return flattenObject(selectedData);
  }, [data]);

  return {
    id,
    handleFormSubmit,
    isLoading: isLoading || UCILoading,
    handlePayload,
    payload,
    handleInput,
    data,
    info,
  };
};
