import { Flex, Text, Box } from '@chakra-ui/react';
import React from 'react';
import InformationItem from './InformationItem';
import { formatNumber } from '@/utils/add-comma';

export default function VerificationInformation({
  verifications,
  paymentType,
  cost,
}: {
  verifications?: string;
  paymentType?: string;
  cost?: number;
}) {
  const verificationValue = verifications
    ?.split(',')
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(', ');

  return (
    <Box>
      <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
        Verification information
      </Text>
      <Flex
        pt={'1.8rem'}
        pb={'2rem'}
        pl={'2.3rem'}
        bg={'white'}
        flexWrap={'wrap'}
        columnGap={'5rem'}
        rowGap={'2rem'}
        rounded={'5px'}
      >
        <InformationItem name="Verifications" value={verificationValue} />
        <InformationItem
          name="Cost of verifications"
          value={'NGN ' + formatNumber(cost)}
        />
        <InformationItem name="Payment type" value={paymentType} />
      </Flex>
    </Box>
  );
}
