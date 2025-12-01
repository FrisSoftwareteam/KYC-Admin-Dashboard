import { useParams } from 'react-router-dom';
import { useGetBusinessByIdApi } from '../api/business/get-business-by-id';
import { useFormik } from 'formik';
import { useEditBusinessApi } from '../api/business/edit-business';

export const useEditBusinessHook = () => {
  const { id } = useParams();
  const { data } = useGetBusinessByIdApi(id as string, {
    enabled: Boolean(id),
  });
  const { mutateAsync, isLoading } = useEditBusinessApi();
  const initialValues = {
    email: data?.data?.email ?? '',
    address: data?.data?.address ?? '',
    businessName: data?.data?.name ?? '',
    industry: data?.data?.industry ?? '',
    businessPhoneNumber: `+234${data?.data?.mainUser?.phoneNumber?.number}`,
  };
  const {
    values,
    handleSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      mutateAsync({ id: id as string, data: values });
      return values;
    },
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  return {
    data,
    isLoading,
    handleFormSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
    values,
  };
};
