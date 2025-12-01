import { Flex, Text, Box, Stack } from '@chakra-ui/react';
import InformationItem from './InformationItem';
import { formatNumber } from '@/utils/add-comma';
import { useGetBusinessMetricsIdApi } from '@/features/dashboard/api/business/get-business-metrics';
import { useParams } from 'react-router-dom';
import { useGetBusinessByIdApi } from '@/features/dashboard/api/business/get-business-by-id';
import { useGetBusinessesServicesApi } from '@/features/dashboard/api/business/get-business-service';

export default function VerificationInformation() {
  const { id } = useParams();

  const { data: BMetrics } = useGetBusinessMetricsIdApi(id as string, {
    enabled: Boolean(id),
  });
  const { data: BDetails } = useGetBusinessByIdApi(id as string, {
    enabled: Boolean(id),
  });
  const { data: BSapi } = useGetBusinessesServicesApi(id as string, {
    enabled: Boolean(id),
  });

  const data = [
    {
      name: 'Candidates',
      value: BMetrics?.data?.totalCandidates,
      _id: crypto.randomUUID(),
    },
    {
      name: 'Verifications',
      value: BMetrics?.data?.totalVerifications,
      _id: crypto.randomUUID(),
    },
    {
      name: 'Total balance',
      value: `₦${formatNumber(BMetrics?.data?.totalPayments)}`,
      _id: crypto.randomUUID(),
    },
    {
      name: 'Total payment',
      value: `₦${formatNumber(BMetrics?.data?.totalPayments)}`,
      _id: crypto.randomUUID(),
    },
    // {
    //   name: 'Outstanding payment',
    //   value: 'NGN 1.6k',
    //   _id: crypto.randomUUID(),
    // },
  ];

  return (
    <Box>
      <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
        Business information
      </Text>

      <Stack bg={'white'}>
        <Flex
          pt={'1.8rem'}
          pb={'2rem'}
          pl={'2.3rem'}
          flexWrap={'wrap'}
          columnGap={'5rem'}
          rowGap={'2rem'}
          rounded={'5px'}
          borderBottom={'1px'}
          borderColor={'#E0E0E0'}
        >
          {data.map((item, index) => (
            <InformationItem
              key={item._id + ' ' + index}
              name={item.value as any}
              value={item.name}
              valueClassName={{ color: '#828282' }}
              nameClassName={{
                color: '#434040',
                fontWeight: 700,
                fontSize: '2rem',
                opacity: 1,
              }}
              className={{
                flex: 1,
              }}
            />
          ))}
        </Flex>

        <Stack gap={'2rem'} pt={'1.8rem'} pb={'2rem'} pl={'2.3rem'}>
          <Flex
            flexWrap={'wrap'}
            columnGap={'5rem'}
            rowGap={'2rem'}
            rounded={'5px'}
          >
            <InformationItem
              name="Business name"
              value={BDetails?.data?.name}
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            <InformationItem
              name="Phone"
              value={
                BDetails?.data?.mainUser?.phoneNumber?.countryCode +
                ' ' +
                BDetails?.data?.mainUser?.phoneNumber?.number
              }
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            <InformationItem
              name="Email"
              value={BDetails?.data?.email}
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            {/* <InformationItem
              name="Industry"
              value={verificationValue}
              className={{
                flex: 1,
              }}
            /> */}
          </Flex>
          <InformationItem
            name="Address"
            value={BDetails?.data?.address}
            className={{
              flex: 1,
            }}
          />
        </Stack>

        <Flex
          pt={'1.8rem'}
          pb={'2rem'}
          pl={'2.3rem'}
          flexWrap={'wrap'}
          columnGap={'5rem'}
          rowGap={'2rem'}
          rounded={'5px'}
        >
          <Box
            border={'1px'}
            borderColor={'#EAEAEA'}
            px={'1.2rem'}
            py={'.8rem'}
            flex={1}
          >
            <Flex
              justifyContent={'space-between'}
              borderBottom={'1px'}
              borderColor={'#EAEAEA'}
              pb={'.5rem'}
            >
              <Text color={'#4F4F4F'} fontWeight={500} fontSize={'1rem'}>
                Verification fees
              </Text>
              <Text color={'#001F78'} fontWeight={500} fontSize={'1rem'}>
                View details
              </Text>
            </Flex>

            <Flex pt={'1.8rem'} flexWrap={'wrap'} rounded={'5px'} gap={'1rem'}>
              {BSapi?.data?.map((item: any, index) => (
                <InformationItem
                  key={item?.name + ' ' + index}
                  name={item?.name as any}
                  value={`₦${formatNumber(item?.price)}`}
                />
              ))}
            </Flex>
          </Box>

          <Box flex={1} />
        </Flex>
      </Stack>
    </Box>
  );
}
