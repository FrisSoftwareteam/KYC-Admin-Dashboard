import React, { useState } from 'react';
import { Button, Input, Flex, FormLabel } from '@chakra-ui/react';
import { useUpdatePriceApi } from '@/features/dashboard/api/service/update-price';
import { useGetServicesApi } from '@/features/dashboard/api/service/get-services';

export default function EditPriceModal({ onClose, row }: any) {
  const [price, setPrice] = useState(row?.price || '');
  const { mutateAsync, isLoading } = useUpdatePriceApi();
  const { refetch } = useGetServicesApi();

  const handleSave = async () => {
    const payload = { price: Number(price), id: row?._id, active: row?.active };
    await mutateAsync(payload);
    await refetch();
    onClose();
  };

  return (
    <Flex direction="column" gap={4}>
      <FormLabel htmlFor="price">{row.name}</FormLabel>
      <Input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
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
          onClick={handleSave}
          isLoading={isLoading}
        >
          Save Price
        </Button>
      </Flex>
    </Flex>
  );
}
