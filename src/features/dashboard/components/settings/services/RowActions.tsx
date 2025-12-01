import CustomModal from '@/components/ui/CustomModal';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import EditPriceModal from './EditPriceModal';
import RemoveModal from './RemoveModal';

export default function RowActions({ row }: any) {
  const updateDisclosure = useDisclosure();
  const removeDisclosure = useDisclosure();
  const isUserDeactivate = row?.original?.active;

  return (
    <Flex justifyContent={'flex-end'} alignItems={'center'} gap={'1rem'}>
      <Button
        color={'#4F4F4F'}
        fontWeight={500}
        fontFamily={'heading'}
        border="1px solid #4F4F4F"
        maxH={'1.2rem'}
        bg={'white'}
        fontSize={'.7rem'}
        _hover={{ bg: 'none' }}
        _focus={{ border: '1px solid #4F4F4F' }}
        onClick={updateDisclosure.onOpen}
        // isDisabled={Boolean(isUserDeactivate)}
      >
        Edit
      </Button>
      <Button
        color={'white'}
        fontWeight={500}
        fontFamily={'heading'}
        maxH={'1.2rem'}
        bg={!isUserDeactivate ? '#00AF94' : '#D0021B'}
        fontSize={'.7rem'}
        _hover={{ bg: isUserDeactivate ? 'gray' : '#D0021B' }}
        onClick={removeDisclosure.onOpen}
      >
        {!isUserDeactivate ? 'Activate' : 'Deactivate'}
      </Button>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={updateDisclosure.isOpen}
        onClose={updateDisclosure.onClose}
        headertext={'Edit Price'}
      >
        <EditPriceModal
          onClose={updateDisclosure.onClose}
          row={row?.original}
        />
      </CustomModal>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={removeDisclosure.isOpen}
        onClose={removeDisclosure.onClose}
        headertext={
          isUserDeactivate ? ' Activate services' : 'Deactivate services'
        }
      >
        <RemoveModal onClose={removeDisclosure.onClose} row={row?.original} />
      </CustomModal>
    </Flex>
  );
}
