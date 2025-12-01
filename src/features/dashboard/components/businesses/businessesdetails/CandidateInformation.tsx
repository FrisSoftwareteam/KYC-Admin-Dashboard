import { Box, Flex, Text } from '@chakra-ui/react';
import InformationItem from './InformationItem';

export default function CandidateInformation({ data }: any) {
  // const { id } = useParams();
  // const { data } = useGetCandidateByIdApi(id as string, {
  //   enabled: Boolean(id),
  // });
  const user = data?.data?.mainUser;
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
        <InformationItem name="First name" value={user?.firstName} />
        <InformationItem name="Last name" value={user?.lastName} />
        <InformationItem name="Middle name" value={user?.middleName} />
        <InformationItem name="Date of birth" value={user?.dateOfBirth} />
        <InformationItem
          name="Phone number"
          value={`${user?.phoneNumber?.countryCode} ${user?.phoneNumber?.number}`}
        />
        <InformationItem name="Email" value={user?.email} />
      </Flex>
    </Box>
  );
}
