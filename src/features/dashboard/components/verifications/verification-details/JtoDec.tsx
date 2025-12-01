import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function DotsText({ alphabet }: { alphabet: string }) {
  return (
    <Center w={'1.2rem'} flexDir={'column'}>
      <Text
        fontFamily={'heading'}
        mb={'.2rem'}
        color={'#828282'}
        fontSize={'.8rem'}
      >
        {alphabet}
      </Text>
      <Box h={'10rem'} w={'1px'} border={'.8px dashed #EAEAEA'}></Box>
    </Center>
  );
}
export default function JtoDec({ year }: { year: string }) {
  return (
    <Box>
      <Flex>
        <DotsText alphabet="J" />
        <DotsText alphabet="F" />
        <DotsText alphabet="M" />
        <DotsText alphabet="A" />
        <DotsText alphabet="M" />
        <DotsText alphabet="J" />
        <DotsText alphabet="J" />
        <DotsText alphabet="A" />
        <DotsText alphabet="S" />
        <DotsText alphabet="O" />
        <DotsText alphabet="N" />
        <DotsText alphabet="D" />
      </Flex>
      <Center
        color={'#4F4F4F'}
        fontWeight={500}
        fontSize={'.8rem'}
        fontFamily={'heading'}
        bg={'#EAEAEA'}
        rounded={'.3rem'}
        h={'1.9rem'}
      >
        {year}
      </Center>
    </Box>
  );
}
