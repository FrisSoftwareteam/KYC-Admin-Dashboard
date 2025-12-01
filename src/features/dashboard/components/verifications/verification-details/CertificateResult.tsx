import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
export default function CertificateResult() {
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
            <IoCheckmarkCircleSharp fontSize={'1.3rem'} color="#00AF94" />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              SSCE
            </Text>
          </Flex>
          <Flex gap={'.5rem'} alignItems={'center'}>
            <IoCheckmarkCircleSharp fontSize={'1.3rem'} color="#00AF94" />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              Bachelor’s Degree
            </Text>
          </Flex>
          <Flex gap={'.5rem'} alignItems={'center'}>
            <IoCheckmarkCircleSharp fontSize={'1.3rem'} color="#00AF94" />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              NYSC
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

      {/* =========================BOTTOM========================== */}
      <Stack spacing={0} maxW={'50rem'}>
        <Box
          pb={'1.4rem'}
          pt={'1.8rem'}
          px={accordionpadding}
          borderBottom="1px solid #EAEAEA"
        >
          <Text color={'#4F4F4F'} fontWeight={500} mb={'1rem'}>
            SSCE Certificate
          </Text>
          <Text fontWeight={400} color={'#828282'} fontFamily={'heading'}>
            SSCE - <b>Start date:</b> Sep. 2001 | <b>End date:</b> May 2006 |
            <b>Institution:</b> Lagos State Secondary School
          </Text>
        </Box>
        <Box
          pb={'1.4rem'}
          pt={'1.8rem'}
          px={accordionpadding}
          borderBottom="1px solid #EAEAEA"
        >
          <Text color={'#4F4F4F'} fontWeight={500} mb={'1rem'}>
            SSCE Certificate
          </Text>
          <Text fontWeight={400} color={'#828282'} fontFamily={'heading'}>
            SSCE - <b>Start date:</b> Sep. 2001 | <b>End date:</b> May 2006 |
            <b>Institution:</b> Lagos State Secondary School
          </Text>
        </Box>
        <Box
          pb={'1.4rem'}
          pt={'1.8rem'}
          px={accordionpadding}
          borderBottom="1px solid #EAEAEA"
        >
          <Text color={'#4F4F4F'} fontWeight={500} mb={'1rem'}>
            SSCE Certificate
          </Text>
          <Text fontWeight={400} color={'#828282'} fontFamily={'heading'}>
            SSCE - <b>Start date:</b> Sep. 2001 | <b>End date:</b> May 2006 |
            <b>Institution:</b> Lagos State Secondary School
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
