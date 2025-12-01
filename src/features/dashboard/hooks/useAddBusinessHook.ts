import { useFormik } from 'formik';
import { useAddBusinessApi } from '../api/business/add-business';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';

export const useAddBusinessHook = () => {
  const { mutateAsync, isLoading } = useAddBusinessApi();
  const navigate = useNavigate();
  const toast = useToast();

  const initialValues = {
    businessName: '',
    email: '',
    address: '',
    cacNumber: '',
    directorNin: '',
    countryCode: 'NG',
    industry: '',
    phoneNumber: '',
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
      const regex = /^(?:\+234|0)(7[0-9]|8[01]|9[0])[0-9]{8}$/;

      if (!regex.test(values.phoneNumber)) {
        toast({ description: 'Invalid phone number', status: 'error' });
        return;
      }
      await mutateAsync(values);
      navigate('/business');
    },
  });
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  return {
    handleFormSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
    values,
    isLoading,
  };
};
