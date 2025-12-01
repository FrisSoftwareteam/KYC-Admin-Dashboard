import { useFormik } from 'formik';
import {
  IPasswordChangeForm,
  changepasswordInitialValues,
} from '../formhandling/initialvalues/change-password';
import { changePasswordValidationSchema } from '../formhandling/validations/change-password';
import { FormEvent } from 'react';
import { useChangePasswordApi } from '../api/change-password';

export const useChangePasswordHook = ({ onClose }) => {
  const { mutateAsync, isLoading } = useChangePasswordApi();
  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    useFormik<IPasswordChangeForm>({
      initialValues: changepasswordInitialValues,
      validationSchema: changePasswordValidationSchema,
      onSubmit: async (values) => {
        await mutateAsync(values);
        onClose();
      },
    });

  const submitform = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading,
  };
};
