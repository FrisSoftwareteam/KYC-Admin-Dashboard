import { useFormik } from 'formik';
import { resetPasswordSchema } from '../formhandling/validation/reset-password';
import { resetPasswordInitialValue } from '../formhandling/initialvalues/reset-password';
import { useResetPasswordApi } from '../api/reset-password';
import { useLocation } from 'react-router-dom';

export const useResetPasswordHook = () => {
  const { mutateAsync, isLoading } = useResetPasswordApi();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const verificationToken = searchParams.get('verificationToken');
  const email = searchParams.get('email');

  const formik = useFormik({
    initialValues: {
      ...resetPasswordInitialValue,
      email: email as string,
      verificationToken: verificationToken as string,
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return {
    ...formik,
    handleFormSubmit,
    isLoading,
    email: formik.values.email,
  };
};
