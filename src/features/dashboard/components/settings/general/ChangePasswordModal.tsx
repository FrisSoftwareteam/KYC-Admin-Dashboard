import PasswordInput from '@/components/input/PasswordInput';
import { useChangePasswordHook } from '@/features/dashboard/hooks/useChangePasswordHook';
import { Button, Divider, Flex, Stack } from '@chakra-ui/react';
import React from 'react';

export default function ChangePasswordModal({ onClose }) {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading,
  } = useChangePasswordHook({ onClose });
  return (
    <form onSubmit={submitform}>
      <Stack spacing={'1.3rem'}>
        <PasswordInput
          inputProps={{
            name: 'oldPassword',
            onChange: handleChange,
            value: values.oldPassword,
            isInvalid: Boolean(errors.oldPassword && touched.oldPassword),
            onBlur: handleBlur,
          }}
          formControlProps={{ isRequired: true, label: 'Current password' }}
          errorMessage={errors.oldPassword}
          touched={touched.oldPassword}
        />
        <PasswordInput
          inputProps={{
            name: 'password',
            onChange: handleChange,
            value: values.password,
            isInvalid: Boolean(errors.password && touched.password),
            onBlur: handleBlur,
          }}
          formControlProps={{ isRequired: true, label: 'New password' }}
          errorMessage={errors.password}
          touched={touched.password}
        />
        <PasswordInput
          inputProps={{
            name: 'confirmPassword',
            onChange: handleChange,
            value: values.confirmPassword,
            isInvalid: Boolean(
              errors.confirmPassword && touched.confirmPassword
            ),
            onBlur: handleBlur,
          }}
          formControlProps={{
            isRequired: true,
            label: 'Re-enter New password',
          }}
          errorMessage={errors.confirmPassword}
          touched={touched.confirmPassword}
        />

        <Divider my={'1.2rem'} borderColor={'#EFF4FD'} />

        <Flex
          gap={'1rem'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          mb={'2rem'}
        >
          <Button
            color={'#4F4F4F'}
            fontSize={'.9rem'}
            maxW={'6rem'}
            variant={'outline'}
            minH={'2.5rem'}
            fontWeight={500}
            fontFamily={'heading'}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            minH={'2.5rem'}
            fontSize={'.9rem'}
            maxW={'6rem'}
            type="submit"
            isLoading={isLoading}
          >
            Update
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}
