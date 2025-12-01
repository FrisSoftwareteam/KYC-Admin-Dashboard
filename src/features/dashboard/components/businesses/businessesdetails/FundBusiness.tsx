import CustomInput from '@/components/input/CustomInput';
import { useFundBusinessServicesApi } from '@/features/dashboard/api/business/fund-business';
import { useGetBusinessByIdApi } from '@/features/dashboard/api/business/get-business-by-id';
import { Box, Button, Divider, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function FundBusiness({ onClose }) {
  const { id } = useParams();
  const { refetch } = useGetBusinessByIdApi(id as string, {
    enabled: Boolean(id),
  });

  const { mutateAsync, isLoading } = useFundBusinessServicesApi();
  const [form, setForm] = useState('');

  const submitForm = async () => {
    await mutateAsync({
      amount: Number(form),
      business: id as string,
    });
    await refetch();
    onClose();
  };

  return (
    <Box pb={'1rem'}>
      <CustomInput
        inputProps={{
          name: 'form',
          value: form,
          type: 'number',
          onChange: (e) => setForm(e?.target?.value),
        }}
        formControlProps={{
          label: 'Amount',
        }}
      />

      <Divider borderColor={'#EFF4FD'} />

      <HStack justifyContent={'flex-end'} w={'full'} pt={'2rem'}>
        <Button
          bg={'transparent'}
          color={'#4F4F4F'}
          border={'1px'}
          borderColor={'#4F4F4F'}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button isLoading={isLoading} onClick={submitForm}>
          Submit
        </Button>
      </HStack>
    </Box>
  );
}
