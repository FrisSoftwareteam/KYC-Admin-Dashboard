import { Flex, Popover, useDisclosure, Text } from '@chakra-ui/react';
import React from 'react';

export default function TableHeader() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
    >
      <Text fontWeight={500} fontSize={'.8rem'}>
        Services
      </Text>

      <Flex pr={'1.5rem'} gap={'1rem'} alignItems={'center'}>
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={true}
        ></Popover>
      </Flex>
    </Flex>
  );
}
