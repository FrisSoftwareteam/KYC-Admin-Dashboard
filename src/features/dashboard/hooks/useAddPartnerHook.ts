import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAddPartnerApi } from '../api/partner/add-partner';
import { useToast } from '@/hooks/useToast';
import { Permissions } from '@/data/permission';
import { useState } from 'react';
import { useGetAllPartnersApi } from '../api/partner/get-all-partners';

export const useAddPartnerHook = () => {
  const { mutateAsync, isLoading } = useAddPartnerApi();
  const navigate = useNavigate();
  const toast = useToast();
  const { refetch } = useGetAllPartnersApi();

  const [settings, setSettings] = useState({
    'can-manage-task': true,
    'can-reassign-task': true,
    'can-manage-agents': true,
    'can-view-agents-task': true,
    'can-view-agents-location': true,
    'can-view-agents-activities': true,
    'can-view-agents-payment-activities': true,
  });
  const [states, setStates] = useState([]);

  const permissionsData = Object.keys(Permissions)?.map((item, i) => ({
    id: i,
    name: item,
    value: Permissions[item],
  }));

  const handleSettings = (e, key) => {
    if (key === 'states') {
      return setStates(e);
    }

    setSettings((prev) => ({ ...prev, [key]: e }));
  };

  const initialValues = {
    partnerName: '',
    email: '',
    address: '',
    countryCode: 'NG',
    phoneNumber: '',
    cacNumber: '',
    directorNin: '',
    settings,
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    const regex = /^(?:\+234|0)(7[0-9]|8[01]|9[0])[0-9]{8}$/;

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!regex.test(values.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    return errors;
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
    initialValues,
    validate,
    onSubmit: async () => {
      if (Object.keys(errors).length === 0) {
        const payload = {
          ...values,
          settings,
          states: states?.map((item: any) => item?.value),
        };
        await mutateAsync(payload);
        await refetch();
        navigate(-1);
      } else {
        toast({
          description: 'Please correct the errors in the form',
          status: 'error',
        });
      }
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
    handleSettings,
    touched,
    handleBlur,
    setFieldValue,
    values,
    isLoading,
    permissionsData,
    settings,
  };
};
