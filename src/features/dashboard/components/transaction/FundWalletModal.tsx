import CurrencyInput from '@/components/input/CurrencyInput';
import { Divider, Flex, Button } from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { useCreatePaymentApi } from '../../api/create-payment';
import { useRecoilValue } from 'recoil';
import { UserState } from '@/features/auth/store';
import { useToast } from '@/hooks/useToast';

export default function FundWalletModal({ onClose }: any) {
  const toast = useToast();
  const user = useRecoilValue(UserState);
  const { mutateAsync, isLoading } = useCreatePaymentApi();
  const [amount, setAmount] = useState('');
  //   const [formattedAmount, setFormattedAmount] = useState('');
  const createPayment = async (e: FormEvent) => {
    e.preventDefault();
    if (!user.id || !user.businessId) {
      toast({ description: 'Invalid business or user ID', status: 'error' });
      return;
    }
    await mutateAsync({
      amount: Number(amount),
      userId: user.id,
      businessId: user.businessId,
    });
    onClose();
  };
  return (
    <form onSubmit={createPayment}>
      <CurrencyInput
        onValueChange={(values: any) => {
          setAmount(values.floatValue);
          //   setFormattedAmount(values.formattedValue);
        }}
        formControlProps={{
          label: 'Enter amount',
        }}
        inputProps={{
          placeholder: '0.00',

          value: amount,
        }}
      />

      <Divider borderColor={'#EFF4FD'} />
      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'2rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          variant={'outline'}
          minH={'2.5rem'}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'9rem'}
          type="submit"
          isLoading={isLoading}
        >
          Make payment
        </Button>
      </Flex>
    </form>
  );
}
