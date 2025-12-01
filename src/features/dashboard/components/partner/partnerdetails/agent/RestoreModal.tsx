import { useRestoreAgentApi } from '@/features/dashboard/api/partner/restore.agent';
import { PartnerFilterState } from '@/features/dashboard/store/partner/filter';
import { useToast } from '@/hooks/useToast';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function RestoreModal({ onClose, row }: any) {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useRestoreAgentApi();
  const filter = useRecoilValue(PartnerFilterState);

  const toast = useToast();
  const restoreUser = async () => {
    if (!row?.original?._id) {
      toast({ description: 'Invalid agent', status: 'error' });
      return;
    }
    await mutateAsync({
      partner: row?.original?.partner?._id,
      agent: row?.original?._id,
    });
    await queryClient.invalidateQueries({
      queryKey: [
        'get-single-partner-verifications',
        filter,
        row?.original?.partner?._id,
      ],
    });

    onClose();
  };
  return (
    <div>
      <Text fontWeight={400}>
        <chakra.span
          textTransform={'capitalize'}
          fontStyle={'italic'}
          fontWeight={500}
        >
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}
        </chakra.span>{' '}
        will now be able to access your dashboard. Do you want to Proceed?
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
        >
          Cancel
        </Button>
        <Button
          onClick={restoreUser}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'gray'}
          _hover={{ bg: 'gray' }}
        >
          Restore agent
        </Button>
      </Flex>
    </div>
  );
}
