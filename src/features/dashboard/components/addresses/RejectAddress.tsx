import { useGetAllAddressesApi } from '@/features/dashboard/api/address/get-all-address';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useRejectAddressApi } from '../../api/address/reject-address';
import { useQueryClient } from '@tanstack/react-query';

export default function RejectAddress({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useRejectAddressApi();
  const { refetch } = useGetAllAddressesApi();
  const queryClient = useQueryClient();
  const rejectAddress = async () => {
    await mutateAsync({
      address: row._id,
    });
    await refetch();
    await queryClient.invalidateQueries({
      queryKey: ['get-address-verifications-metrics'],
    });
    onClose();
  };

  return (
    <div>
      <Text fontWeight={400}>
        This verification will be <b>Rejected</b> . Do you want to Proceed?
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
          onClick={rejectAddress}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#D0021B !important'}
        >
          Reject
        </Button>
      </Flex>
    </div>
  );
}
