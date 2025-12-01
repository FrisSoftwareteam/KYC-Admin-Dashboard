import { Flex, Text, Box, Stack } from '@chakra-ui/react';
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

  const data = [
    { name: 'Candidates', value: '56.5k', _id: crypto.randomUUID() },
    { name: 'Verifications', value: '1.3k', _id: crypto.randomUUID() },
    { name: 'Total payment', value: 'NGN 9.7k', _id: crypto.randomUUID() },
    {
      name: 'Outstanding payment',
      value: 'NGN 1.6k',
      _id: crypto.randomUUID(),
    },
  ];

  return (
    <Box>
      <Text mb={'.7rem'} color={'#565656'} fontFamily={'heading'}>
        Partner information
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
          {data.map((item) => (
            <InformationItem
              key={item._id}
              name={item.value}
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
              value={verificationValue}
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            <InformationItem
              name="Phone"
              value={'NGN ' + formatNumber(cost)}
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            <InformationItem
              name="Email"
              value={paymentType}
              className={{
                borderRight: '1px',
                color: '#E0E0E0',
                flex: 1,
              }}
            />
            <InformationItem
              name="Industry"
              value={verificationValue}
              className={{
                flex: 1,
              }}
            />
          </Flex>
          <InformationItem
            name="Address"
            value={verificationValue}
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
              {/* <Text color={'#001F78'} fontWeight={500} fontSize={'1rem'}>
                View details
              </Text> */}
            </Flex>

            <Flex
              pt={'1.8rem'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              rounded={'5px'}
            >
              {data.map((item) => (
                <InformationItem
                  key={item._id}
                  name={item.value}
                  value={item.name}
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
