import { useDisableAgentApi } from '@/features/dashboard/api/partner/disable-agent';
import { PartnerFilterState } from '@/features/dashboard/store/partner/filter';
import { useToast } from '@/hooks/useToast';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export default function RemoveModal({ onClose, row }: any) {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useDisableAgentApi();
  const filter = useRecoilValue(PartnerFilterState);

  const toast = useToast();
  const suspendUser = async () => {
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
      <Text fontFamily={'heading'} fontWeight={500}>
        <chakra.span
          textTransform={'capitalize'}
          fontStyle={'italic'}
          fontWeight={400}
        >
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}{' '}
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
          Suspend agent
        </Button>
      </Flex>
    </div>
  );
}
