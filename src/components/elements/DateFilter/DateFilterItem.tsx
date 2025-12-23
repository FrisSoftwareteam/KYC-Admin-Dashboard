import React from 'react';
import { Center } from '@chakra-ui/react';

interface DateFilterItemProps {
  item: string;
  isActive: boolean;
  onClick: () => void;
}

export default function DateFilterItem({
  item,
  isActive,
  onClick,
}: DateFilterItemProps) {
  return (
    <Center
      fontSize=".8rem"
      cursor="pointer"
      h="2rem"
      px=".8rem"
      rounded="999px"
      fontWeight={isActive ? 600 : 500}
      border={isActive ? '1px solid #1B4F8F' : '1px solid #E2E8F0'}
      color={isActive ? '#1B4F8F' : '#667085'}
      bg={isActive ? '#E9F1FF' : 'white'}
      boxShadow={isActive ? '0 6px 16px rgba(27, 79, 143, 0.18)' : 'none'}
      onClick={onClick}
      lineHeight="20px"
      fontFamily={'heading'}
      transition="all 0.2s ease"
      _hover={{
        borderColor: '#1B4F8F',
        color: '#1B4F8F',
      }}
    >
      {item}
    </Center>
  );
}
