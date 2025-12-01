import {
  Center,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Text,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiFilter } from 'react-icons/fi';
import Filter from '../Filter';
import { useExportVerificationMutation } from '@/features/dashboard/api/verifications/export-verification';
import { TfiExport } from 'react-icons/tfi';
import { useParams } from 'react-router-dom';

export default function TableHeader({ total }: { total?: number }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { id } = useParams();

  const {
    mutateAsync: ExportVerification,
    isLoading: ExportVerificationLoading,
  } = useExportVerificationMutation();
  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
      pr={'2.81rem'}
    >
      <Text fontWeight={500} fontSize={'.8rem'}>
        {total} Verifications
      </Text>
      <Flex pr={'1.5rem'} gap={'1rem'} alignItems={'center'}>
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Center
              boxShadow="0px 1px 8px 0px #0A008214"
              w={'4rem'}
              h={'1.5rem'}
              gap={'.3rem'}
              cursor={'pointer'}
              rounded={'.3rem'}
            >
              <FiFilter fontSize={'.8rem'} />
              <Text fontWeight={500} fontSize={'.7rem'}>
                Fliter
              </Text>
            </Center>
          </PopoverTrigger>
          <PopoverContent
            w={'23rem'}
            mr={'2rem'}
            rounded={'.5rem'}
            border="none !important"
            outline={'none !important'}
            _focusVisible={{
              boxShadow:
                '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A', // Apply the specified box shadows
            }}
            boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A" // Apply the specified box shadows
          >
            <PopoverArrow />
            <Filter />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => ExportVerification(String(id))}
          fontWeight={500}
          fontFamily={'heading'}
          fontSize={'.7rem'}
          leftIcon={<TfiExport fontSize={'.8rem'} />}
          variant={'secondary'}
          border={'1px solid'}
          isLoading={ExportVerificationLoading}
          maxW={'5rem'}
        >
          Export
        </Button>
      </Flex>
    </Flex>
  );
}
