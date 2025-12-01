import { useGetAllUsersApi } from '@/features/dashboard/api/users/get-all-users';
import { useSuspendUserApi } from '@/features/dashboard/api/users/suspend-user';
import { useToast } from '@/hooks/useToast';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';

export default function RemoveModal({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useSuspendUserApi();
  const { refetch } = useGetAllUsersApi();
  const toast = useToast();
  const suspendUser = async () => {
    if (!row?.original?._id) {
      toast({ description: 'Invalid user', status: 'error' });
      return;
    }
    await mutateAsync(row?.original?._id);
    await refetch();

    onClose();
  };
  return (
    <div>
      <Text fontFamily={'heading'} fontWeight={500}>
        <chakra.span
          textTransform={'capitalize'}
          fontStyle={'italic'}
          fontWeight={400}
        >
          {row?.original?.firstName} {row?.original?.lastName}{' '}
        </chakra.span>
        will no longer be able to access your dashboard. Do you want to Proceed?
      </Text>
      <Divider mt={'1rem'} borderColor={'#EFF4FD'} />
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
          onClick={suspendUser}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#D0021B'}
          _hover={{ bg: '#D0021B' }}
          isLoading={isLoading}
        >
          Suspend user
        </Button>
      </Flex>
    </div>
  );
}
