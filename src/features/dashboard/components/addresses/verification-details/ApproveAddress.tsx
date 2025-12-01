import { useApproveAddressApi } from '@/features/dashboard/api/address/approve-address';
import { useGetAllAddressesApi } from '@/features/dashboard/api/address/get-all-address';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

export default function ApproveAddress({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useApproveAddressApi();
  const { refetch } = useGetAllAddressesApi();
  const queryClient = useQueryClient();

  const approveAddress = async () => {
    await mutateAsync({
      address: row._id,
      status: 'approved',
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
        This verification will be <b>Approved</b> . Do you want to Proceed?
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
          onClick={approveAddress}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#00AF94'}
          _hover={{ bg: '#00AF94' }}
        >
          Approve
        </Button>
      </Flex>
    </div>
  );
}
