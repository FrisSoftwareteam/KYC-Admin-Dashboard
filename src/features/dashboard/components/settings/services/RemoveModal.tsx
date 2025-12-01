import { useGetServicesApi } from '@/features/dashboard/api/service/get-services';
import { useUpdatePriceApi } from '@/features/dashboard/api/service/update-price';
import { useToast } from '@/hooks/useToast';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';

export default function RemoveModal({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useUpdatePriceApi();
  const { refetch } = useGetServicesApi();
  const toast = useToast();

  const suspendUser = async () => {
    if (!row?._id) {
      toast({ description: 'Invalid user', status: 'error' });
      return;
    }
    const payload = { price: row?.price, id: row?._id, active: !row?.active };
    await mutateAsync(payload);
    await refetch();
    onClose();
  };
  return (
    <div>
      <Text fontFamily={'heading'} fontWeight={500}>
        {/* <chakra.span
          textTransform={'capitalize'}
          fontStyle={'italic'}
          fontWeight={400}
        >
          {row?.name}{' '}
        </chakra.span> */}
        This Action is not reversable. Do you want to Proceed?
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
          bg={!row?.active ? '#00AF94' : '#D0021B'}
          _hover={{ bg: !row?.active ? 'gray' : '#D0021B' }}
          isLoading={isLoading}
        >
          {!row?.active ? 'Activate' : 'Deactivate'}
        </Button>
      </Flex>
    </div>
  );
}
