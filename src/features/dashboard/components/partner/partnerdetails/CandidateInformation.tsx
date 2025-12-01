import { Box, Flex, Text } from '@chakra-ui/react';
import InformationItem from './InformationItem';

import { ICandidate } from '@/shared/interface/verification';

export default function CandidateInformation({
  name,
  phoneNumber,
  email,
}: Partial<ICandidate>) {
  return (
    <Box>
      <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
        Contact information
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
        <InformationItem name="Name" value={name} />
        {/* <InformationItem name="Date of birth" value={dateOfBirth} /> */}
        {/* <InformationItem name="Identity type" value="National ID" /> */}
        <InformationItem name="Phone number" value={phoneNumber} />
        {email && <InformationItem name="Email" value={email} />}
        {/* <InformationItem
          name="Address"
          value="44 James Haliday street, Surulere, Lagos"
        />
        <InformationItem name="Date created " value="12/12/2024" />
        <InformationItem name="Created  by" value="Tosin Dadadang" /> */}
      </Flex>
    </Box>
  );
}
