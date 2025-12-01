import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useGetPartnerByIdApi } from '../api/partner/get-partner-by-id';
import { useEditPartnerApi } from '../api/partner/edit-partner';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { Permissions } from '@/data/permission';

const verifyPhoneNumber = (e: any) => {
  const test = e?.length < 11;

  if (test) {
    return `0${e}`;
  }
  return e;
};

export const useEditPartnerHook = () => {
  const { id } = useParams();
  const toast = useToast();
  const { data, refetch } = useGetPartnerByIdApi(id as string, {
    enabled: Boolean(id),
  });

  const { mutateAsync, isLoading } = useEditPartnerApi();

  const [settings, setSettings] = useState({
    'can-manage-task': data?.data?.settings?.['can-manage-task'],
    'can-reassign-task': data?.data?.settings?.['can-reassign-task'],
    'can-manage-agents': data?.data?.settings?.['can-manage-agents'],
    'can-view-agents-task': data?.data?.settings?.['can-view-agents-task'],
    'can-view-agents-location':
      data?.data?.settings?.['can-view-agents-location'],
    'can-view-agents-activities':
      data?.data?.settings?.['can-view-agents-activities'],
    'can-view-agents-payment-activities':
      data?.data?.settings?.['can-view-agents-payment-activities'],
  });

  const [states, setStates] = useState(data?.data?.states || []);

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
    partnerName: data?.data?.name ?? '',
    address: data?.data?.address ?? '',
    phoneNumber: data?.data?.phoneNumber
      ? verifyPhoneNumber(data?.data?.phoneNumber)
      : '',
    settings,
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
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async () => {
      const regex = /^(?:\+234|0)(7[0-9]|8[01]|9[0])[0-9]{8}$/;

      if (!regex.test(values.phoneNumber)) {
        toast({ description: 'Invalid phone number', status: 'error' });
        return;
      }

      const payload = {
        ...values,
        states: states?.map((item: any) => item?.value || item),
      };

      await mutateAsync({ id: id as string, data: payload });
      await refetch();
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
    values,
    setFieldValue,
    permissionsData,
    handleSettings,
    states,
  };
};
