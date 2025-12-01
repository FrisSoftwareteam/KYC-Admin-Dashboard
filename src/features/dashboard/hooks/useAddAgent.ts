import { useFormik } from 'formik';
import { FormEvent } from 'react';
import { useToast } from '@/hooks/useToast';
import { IAddAgent } from '../types/agent';
import { addAgentInitialValues } from '../formhandling/initialvalues/add-agent';
import { addAgentValidationschema } from '../formhandling/validations/add-agent';
import { useParams } from 'react-router-dom';
import { useAddAgentApi } from '../api/agent/add-agent';
import { useGetSinglePartnerVerificationsApi } from '../api/partner/get-partner-verifications';

export const useAddAgentHook = ({ onClose }) => {
  const { id } = useParams();
  const { mutateAsync: AAapi, isLoading: AAloading } = useAddAgentApi();
  const { refetch } = useGetSinglePartnerVerificationsApi(id as string, {
    enabled: Boolean(id),
  });
  const toast = useToast();

  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik<IAddAgent>({
    initialValues: addAgentInitialValues,
    validationSchema: addAgentValidationschema,
    onSubmit: async (values) => {
      if (!id) {
        toast({ description: 'Invalid partner', status: 'error' });
        return;
      }
      let number = values.phoneNumber;
      if (values.phoneNumber.startsWith('0')) {
        number = values.phoneNumber.slice(1);
      }

      await AAapi({
        ...values,
        phoneNumber: { countryCode: '+234', number },
        partner: id,
      });
      await refetch();
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
    isLoading: AAloading,
    setFieldValue,
  };
};
