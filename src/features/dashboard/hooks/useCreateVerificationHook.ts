import { useFormik } from 'formik';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCreateVerificationApi } from '../api/create-verification-api';
import { createVerificationInitialvalues } from '../formhandling/initialvalues/create-verification';
import { createVerificationRequestSchema } from '../formhandling/validations/create-verification';
import { ICreateverification } from '../types/verifications/create-verification';
import { useUploadCandidateImageApi } from '../api/upload-image';
import { useGetAllCandidatesApi } from '../api/candidate/get-all-candidates';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { CreateVerificationState } from '../store/verifications/create-verification';
import { useAddCandidateApi } from '../api/candidate/add-candidate';

interface UseCreateVerificationHookProps {
  onClose?: (step: string) => void;
}
export const useCreateVerificationHook = ({
  onClose = () => {},
}: UseCreateVerificationHookProps = {}) => {
  const { mutateAsync, isLoading } = useCreateVerificationApi({ onClose });
  const [image, setImage] = useState<any>();
  const [existingCandidate, setExistingCandidate] = useState(false);
  const [verificationList, setverificationList] = useState<any>([]);
  const verificationState = useRecoilValue(CreateVerificationState);
  const resetVerificationState = useResetRecoilState(CreateVerificationState);
  const { mutateAsync: UCIapi, isLoading: UCIloading } =
    useUploadCandidateImageApi();
  const { mutateAsync: ACapi, isLoading: ACloading } = useAddCandidateApi();

  const { data: allCandidates } = useGetAllCandidatesApi();
  const allCandidatesOptions = allCandidates?.data?.map((item) => ({
    label: `${item?.firstName} ${item?.lastName}`,
    value: item?._id,
  }));

  const uploadImage = async () => {
    const form = new FormData();
    if (!image) {
      // toast({ description: 'Please choose an image', status: 'error' });
      return undefined;
    }
    form.append('image', image);
    const res = await UCIapi(form);
    return res.data?.url;
  };
  const {
    values,
    handleSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik<ICreateverification>({
    initialValues: createVerificationInitialvalues,
    validationSchema: createVerificationRequestSchema,
    onSubmit: async () => {
      const payload: any = { ...verificationState };
      if (verificationState.existingCandidate) {
        payload.candidateId = verificationState.candidate._id;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...candidateWithoutId } = verificationState.candidate;
        const imageUrl = await uploadImage();
        const res = await ACapi({ ...candidateWithoutId, imageUrl });
        payload.candidateId = res.data._id;
      }
      delete payload.candidate;
      await mutateAsync(payload);
      resetVerificationState();
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handlefileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  // console.log('err is ', errors);

  return {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleFormSubmit,
    isLoading: isLoading || UCIloading || ACloading,
    setFieldValue,
    handlefileChange,
    uploadImage,
    existingCandidate,
    setExistingCandidate,
    allCandidatesOptions,
    allCandidates,
    verificationList,
    setverificationList,
    handleSubmit,
  };
};
