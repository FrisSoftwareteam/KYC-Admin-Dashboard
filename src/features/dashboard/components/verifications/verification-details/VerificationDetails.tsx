import { Box, Stack } from '@chakra-ui/react';
import Head from './Head';
import CandidateInformation from './CandidateInformation';
import VerificationInformation from './VerificationInformation';
import Results from './Results';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useParams } from 'react-router-dom';
import { useGetVerificationByIdApi } from '@/features/dashboard/api/verifications/get-verification-by-id';

export function VerificationDetails() {
  const { id } = useParams();

  const { isLoading, data } = useGetVerificationByIdApi(id as string);

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <Box>
      <Head
        name={`${data?.data?.candidate?.firstName} ${data?.data?.candidate?.lastName}`}
      />
      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <CandidateInformation {...data?.data.candidate} />
        <VerificationInformation
          cost={data?.data?.cost}
          paymentType={data?.data?.paymentType}
          verifications={data?.data?.verificationType}
        />
        <Results data={data?.data} />
      </Stack>
    </Box>
  );
}
