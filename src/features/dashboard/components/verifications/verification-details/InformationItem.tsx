import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function InformationItem({
  name,
  value,
}: {
  name: string;
  value?: string;
}) {
  return (
    <Box>
      <Text opacity={0.8} fontWeight={400} color={'#828282'} fontSize={'.8rem'}>
        {name}
      </Text>
      <Text color={'#4F4F4F'} fontWeight={400} fontSize={'.8rem'}>
        {value}
      </Text>
    </Box>
  );
}
