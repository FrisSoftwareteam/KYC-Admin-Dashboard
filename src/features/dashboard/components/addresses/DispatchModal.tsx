import React, { useEffect, useState } from 'react';
import { useGetAllPartnersBulkApi } from '../../api/address/get-all-partners-bulk';
import CustomSelect from '@/components/input/CustomSelect';
import { Button, Checkbox, Flex, Stack } from '@chakra-ui/react';
import { useToast } from '@/hooks/useToast';
import { useSendBulkApi } from '../../api/address/sund-bulk';
import { useGetAllAddressesApi } from '../../api/address/get-all-address';

export default function DispatchModal({ onClose, rowSelection }) {
  //   console.log(rowSelection);
  const { data: Addresses } = useGetAllAddressesApi();

  const { data } = useGetAllPartnersBulkApi();
  const [partnerOptions, setPartnerOptions] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [broadcastToAgent, setBroadcastToAgent] = useState(true);
  const { mutateAsync, isLoading } = useSendBulkApi();
  const toast = useToast();

  const dispatch = async () => {
    if (Object.keys(rowSelection).length === 0) {
      toast({
        description: 'No invoice selected!',
        status: 'error',
      });
      return;
    }
    const arrayOfSelected = Object.entries(rowSelection).map(([key, value]) => {
      if (!value) return;
      return Number(key);
    });

    const selectedInvoices =
      Addresses.data?.addresses
        ?.filter((_item: any, index: any) => {
          return arrayOfSelected.includes(Number(index));
        })
        .map((item) => item._id) || [];

    // console.log({
    //   partner: selectedPartner,
    //   addresses: selectedInvoices,
    //   broadcastToAgent,
    // });
    // return;
    await mutateAsync({
      partner: selectedPartner,
      addresses: selectedInvoices,
      broadcastToAgent,
    });
    onClose();
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      const arr = data.data?.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setPartnerOptions(arr);
    }
  }, [data]);
  return (
    <div>
      <Stack spacing={'1rem'}>
        <CustomSelect
          label="Select Partner"
          placeholder="Type  search..."
          options={partnerOptions}
          onChange={(val) => {
            setSelectedPartner(val.value);
          }}
        />
        <Checkbox
          colorScheme="primary"
          size={'sm'}
          isChecked={broadcastToAgent}
          onChange={() => setBroadcastToAgent((prev) => !prev)}
        >
          Send Broadcast to agent
        </Checkbox>
      </Stack>

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
          onClick={dispatch}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#00AF94'}
          _hover={{ bg: '#00AF94' }}
          isDisabled={!selectedPartner}
        >
          Dispatch
        </Button>
      </Flex>
    </div>
  );
}
