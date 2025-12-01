import { useFormik } from 'formik';
import { forgotPasswordSchema } from '../formhandling/validation/forgot-password';
import { forgotPasswordInitialValue } from '../formhandling/initialvalues/forgot-password';
import { useForgotPasswordApi } from '../api/forgot-password';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordRequest {
  email: string;
  dashboardType: string;
}

export const useForgetPasswordHook = () => {
  const { mutateAsync, isLoading } = useForgotPasswordApi();
  const navigate = useNavigate();

  const formik = useFormik<ForgotPasswordRequest>({
    initialValues: forgotPasswordInitialValue,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await mutateAsync({ ...values, dashboardType: 'admin' });
      navigate('/login');
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
  };
};
