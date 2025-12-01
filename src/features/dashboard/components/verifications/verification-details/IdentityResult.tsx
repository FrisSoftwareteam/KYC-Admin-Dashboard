import { formatDate } from '@/utils/date-formater';
import { getColor } from '@/utils/get-color';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
export default function IdentityResult({ data }: any) {
  const accordionpadding = '2.5rem';

  const validationResponse = data?.identity?.validationResponse;
  const validationData = data?.identity?.validationData;
  const getColorBoolean = (val: boolean): string => {
    return val ? '#00AF94' : '#D0021B';
  };
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
            <IoCheckmarkCircleSharp
              fontSize={'1.3rem'}
              color={getColor(data?.identity?.status)}
            />
            <Text fontFamily={'heading'} fontSize={'.8rem'}>
              {data?.identity?.idType}
            </Text>
          </Flex>
          {validationResponse?.firstName && (
            <Flex gap={'.5rem'} alignItems={'center'}>
              <IoCheckmarkCircleSharp
                fontSize={'1.3rem'}
                color={getColorBoolean(validationResponse?.firstName?.matched)}
              />
              <Text fontFamily={'heading'} fontSize={'.8rem'}>
                First name
              </Text>
            </Flex>
          )}
          {validationResponse?.lastName && (
            <Flex gap={'.5rem'} alignItems={'center'}>
              <IoCheckmarkCircleSharp
                fontSize={'1.3rem'}
                color={getColorBoolean(validationResponse?.lastName?.matched)}
              />
              <Text fontFamily={'heading'} fontSize={'.8rem'}>
                Last name
              </Text>
            </Flex>
          )}
          {validationResponse?.dateOfBirth && (
            <Flex gap={'.5rem'} alignItems={'center'}>
              <IoCheckmarkCircleSharp
                fontSize={'1.3rem'}
                color={getColorBoolean(
                  validationResponse?.dateOfBirth?.matched
                )}
              />
              <Text fontFamily={'heading'} fontSize={'.8rem'}>
                Date of birth
              </Text>
            </Flex>
          )}
          {validationResponse?.phoneNumber && (
            <Flex gap={'.5rem'} alignItems={'center'}>
              <IoCheckmarkCircleSharp
                fontSize={'1.3rem'}
                color={getColorBoolean(
                  validationResponse?.phoneNumber?.matched
                )}
              />
              <Text fontFamily={'heading'} fontSize={'.8rem'}>
                Phone number
              </Text>
            </Flex>
          )}
        </Flex>

        <Flex gap={'.5rem'} alignItems={'center'} color={'#828282'}>
          <MdCalendarMonth />
          <Text fontFamily={'heading'} fontSize={'.8rem'}>
            {formatDate(data?.createdAt)}
          </Text>
        </Flex>
      </Flex>

      {/* =================================BOTTOM======== */}
      <Stack
        px={accordionpadding}
        mb={'1.7rem'}
        spacing={'1.3rem'}
        mt={'2.5rem'}
      >
        {validationData?.firstName && (
          <Flex gap={'4rem'} alignItems={'center'}>
            <Text minW={'6rem'} color={'#828282'} fontFamily={'heading'}>
              Name
            </Text>
            <Text color={'#828282'} fontFamily={'heading'}>
              {validationData?.firstName} {validationData?.lastName}
            </Text>
          </Flex>
        )}
        {validationData?.dateOfBirth && (
          <Flex gap={'4rem'} alignItems={'center'}>
            <Text minW={'6rem'} color={'#828282'} fontFamily={'heading'}>
              Date of birth
            </Text>
            <Text color={'#828282'} fontFamily={'heading'}>
              {validationData?.dateOfBirth}
            </Text>
          </Flex>
        )}
        <Flex gap={'4rem'} alignItems={'center'}>
          <Text
            minW={'6rem'}
            color={'#828282'}
            textTransform={'uppercase'}
            fontFamily={'heading'}
          >
            {data?.identity?.idType}
          </Text>
          <Text color={'#828282'} fontFamily={'heading'}>
            {data?.identity?.idNumber}
          </Text>
        </Flex>
        {validationData?.phoneNumber && (
          <Flex gap={'4rem'} alignItems={'center'}>
            <Text minW={'6rem'} color={'#828282'} fontFamily={'heading'}>
              Phone number
            </Text>
            <Text color={'#828282'} fontFamily={'heading'}>
              {validationData?.phoneNumber}
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  );
}
