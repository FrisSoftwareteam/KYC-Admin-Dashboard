import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { HiMiniExclamationCircle } from 'react-icons/hi2';
import { MdCalendarMonth } from 'react-icons/md';
import JtoDec from './JtoDec';

export default function EmploymentResult() {
  const accordionpadding = '2.5rem';

  return (
    <Box>
      <Flex
        flexWrap={'wrap'}
        bg={'white'}
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottom="1px solid #EAEAEA"
        h={'4rem'}
        px={accordionpadding}
      >
        <Flex
          flexWrap={'wrap'}
          color={'#828282'}
          alignItems={'center'}
          gap={'2rem'}
        >
          <Flex gap={'.5rem'} alignItems={'center'}>
            <HiMiniExclamationCircle fontSize={'1.3rem'} color="#F5A623" />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              International passport{' '}
            </Text>
          </Flex>
        </Flex>

        <Flex gap={'.5rem'} alignItems={'center'} color={'#828282'}>
          <MdCalendarMonth />
          <Text fontFamily={'heading'} fontSize={'.8rem'}>
            12/05/2024
          </Text>
        </Flex>
      </Flex>
      <Box position={'relative'}>
        <Flex gap={'1rem'} padding={accordionpadding}>
          <JtoDec year={'2012'} />
          <JtoDec year={'2013'} />
          <JtoDec year={'2014'} />
          <JtoDec year={'2015'} />
        </Flex>
        <Center
          color={'white'}
          fontWeight={500}
          fontSize={'.8rem'}
          fontFamily={'heading'}
          bg={'#00AF94'}
          rounded={'.3rem'}
          h={'1.9rem'}
          position={'absolute'}
          top={'30%'}
          left={'10%'}
          w={'16rem'}
        >
          Company name
        </Center>
        <Center
          color={'#11406F'}
          fontWeight={500}
          fontSize={'.8rem'}
          fontFamily={'heading'}
          bg={'#F5A623'}
          rounded={'.3rem'}
          h={'1.9rem'}
          position={'absolute'}
          top={'45%'}
          left={'38%'}
          w={'16rem'}
        >
          Company name
        </Center>
        <Center
          color={'#11406F'}
          fontWeight={500}
          fontSize={'.8rem'}
          fontFamily={'heading'}
          bg={'#F5A623'}
          rounded={'.3rem'}
          h={'1.9rem'}
          position={'absolute'}
          top={'55%'}
          left={'65%'}
          w={'16rem'}
        >
          Company name
        </Center>
      </Box>
    </Box>
  );
}
