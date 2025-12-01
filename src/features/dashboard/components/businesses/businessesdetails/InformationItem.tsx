import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

export default function InformationItem({
  name,
  value,
  className,
  nameClassName,
  valueClassName,
}: {
  name: string;
  value?: string;
  className?: BoxProps;
  nameClassName?: TextProps;
  valueClassName?: TextProps;
}) {
  if (!value) {
    return null;
  }
  return (
    <Box {...className}>
      <Text
        opacity={0.8}
        fontWeight={400}
        color={'#828282'}
        fontSize={'.8rem'}
        {...nameClassName}
      >
        {name}
      </Text>
      <Text
        color={'#4F4F4F'}
        fontWeight={400}
        fontSize={'.8rem'}
        {...valueClassName}
      >
        {value}
      </Text>
    </Box>
  );
}
