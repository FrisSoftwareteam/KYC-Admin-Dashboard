import ChartCard from '@/components/cards/ChartCard';
import CustomTable from '@/components/table/CustomTable';
import { LogoLoader } from '@/components/elements/loader/Loader';
import DateFilterItem from '@/components/elements/DateFilter/DateFilterItem';
import { datesFilter } from '@/data/datefilter';
import { IVerification } from '@/shared/interface/verification';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import React, { useState } from 'react';
import { ReactComponent as MetricsSvg } from '@/assets/metrics.svg';
import { useGetRecentVerificationApi } from '../../api/verifications/recent-verification';
import { useAdminMetricsApi } from '../../api/get-metrics';
import { columnDef } from './columndef';

const formatShortDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const buildDateRange = (days: number, offsetDays = 0) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - offsetDays);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - days);
  return {
    customStartDate: formatShortDate(startDate),
    customEndDate: formatShortDate(endDate),
  };
};

const getPercentChange = (current: number, previous: number) => {
  if (!Number.isFinite(previous) || previous === 0) {
    return current === 0 ? 0 : null;
  }
  return ((current - previous) / previous) * 100;
};

export function Home() {
  const { data, isLoading } = useGetRecentVerificationApi();
  const arrayData: Array<IVerification> | undefined = data?.data?.map(
    (item) => ({
      status: item?.status,
      date: item?.createdAt,
      type: item?.verificationType,
      name: `${item?.candidate?.firstName} ${item?.candidate?.lastName}`,
      _id: item._id,
    })
  );
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateFilter, setDateFilter] = useState<any>(() => buildDateRange(30));
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const { data: businessMetrics, isLoading: metricsLoading } =
    useAdminMetricsApi(dateFilter, { refetchInterval: 5000 });
  const previousFilter = buildDateRange(
    dateRange.value,
    dateRange.value === 0 ? 1 : dateRange.value
  );
  const { data: previousMetrics } = useAdminMetricsApi(previousFilter);
  const completedValue = Number(businessMetrics?.data?.completed ?? 0);
  const revenueValue = Number(businessMetrics?.data?.revenue ?? 0);
  const formattedRevenue = `NGN ${revenueValue.toLocaleString()}`;
  const currentRangeLabel = dateFilter?.customStartDate
    ? `${dateFilter.customStartDate} - ${dateFilter.customEndDate}`
    : dateRange.name;
  const previousRangeLabel = `${previousFilter.customStartDate} - ${previousFilter.customEndDate}`;
  const totalVerificationsChange = getPercentChange(
    Number(businessMetrics?.data?.totalVerifications ?? 0),
    Number(previousMetrics?.data?.totalVerifications ?? 0)
  );
  const totalBusinessesChange = getPercentChange(
    Number(businessMetrics?.data?.totalBusinesses ?? 0),
    Number(previousMetrics?.data?.totalBusinesses ?? 0)
  );
  const totalPartnersChange = getPercentChange(
    Number(businessMetrics?.data?.totalPartners ?? 0),
    Number(previousMetrics?.data?.totalPartners ?? 0)
  );
  const totalAgentsChange = getPercentChange(
    Number(businessMetrics?.data?.totalAgents ?? 0),
    Number(previousMetrics?.data?.totalAgents ?? 0)
  );
  const formattedVerificationDelta =
    typeof totalVerificationsChange === 'number'
      ? `${totalVerificationsChange >= 0 ? '+' : ''}${totalVerificationsChange.toFixed(
          1
        )}%`
      : 'No prior data';

  return (
    <Box p={{ base: '1rem', md: '1.5rem' }}>
      <Stack spacing={'1.5rem'}>
        <Box
          bg={'white'}
          rounded={'1rem'}
          p={{ base: '1rem', md: '1.5rem' }}
          border={'1px solid'}
          borderColor={'#EEF0F4'}
          boxShadow={'0 18px 40px rgba(17, 64, 111, 0.08)'}
        >
          <Flex
            gap={'1.5rem'}
            direction={{ base: 'column', lg: 'row' }}
            align={'stretch'}
          >
            <Box
              flex={1}
              bgGradient="linear(to-br, #0F2D52, #1B4F8F, #2B6CB0)"
              color={'white'}
              rounded={'0.9rem'}
              p={{ base: '1.25rem', md: '1.75rem' }}
              position={'relative'}
              overflow={'hidden'}
            >
              <Box
                position={'absolute'}
                top={'-3rem'}
                right={'-3rem'}
                w={'10rem'}
                h={'10rem'}
                rounded={'full'}
                bg={'whiteAlpha.200'}
              />
              <Box
                position={'absolute'}
                bottom={'-4rem'}
                left={'-4rem'}
                w={'14rem'}
                h={'14rem'}
                rounded={'full'}
                bg={'whiteAlpha.100'}
              />
              <Text fontFamily={'heading'} fontWeight={700} fontSize={'1.6rem'}>
                Dashboard Overview
              </Text>
              <Text mt={'.4rem'} fontSize={'.95rem'} color={'whiteAlpha.800'}>
                Track verification performance, partners, and revenue in one
                view.
              </Text>
              <Flex mt={'1.2rem'} gap={'.6rem'} wrap={'wrap'}>
                <Box
                  bg={'whiteAlpha.200'}
                  px={'.75rem'}
                  py={'.4rem'}
                  rounded={'full'}
                  fontSize={'.75rem'}
                  fontWeight={600}
                >
                  Real-time insights
                </Box>
                <Box
                  bg={'whiteAlpha.200'}
                  px={'.75rem'}
                  py={'.4rem'}
                  rounded={'full'}
                  fontSize={'.75rem'}
                  fontWeight={600}
                >
                  Operational health
                </Box>
              </Flex>
              <Box mt={'1.3rem'}>
                <Text fontSize={'.8rem'} color={'whiteAlpha.800'}>
                  Active range
                </Text>
                <Text fontSize={'1rem'} fontWeight={600}>
                  {currentRangeLabel}
                </Text>
              </Box>
            </Box>
            <Box
              flex={1}
              bg={'#F9FAFC'}
              rounded={'0.9rem'}
              p={{ base: '1rem', md: '1.5rem' }}
              border={'1px solid'}
              borderColor={'#EEF0F4'}
            >
              <Flex align={'center'} justify={'space-between'}>
                <Text
                  fontSize={'.75rem'}
                  color={'#6B7280'}
                  fontWeight={700}
                  textTransform={'uppercase'}
                >
                  Date range
                </Text>
                <Button
                  size={'sm'}
                  variant={'outline'}
                  colorScheme={'blue'}
                  fontSize={'.7rem'}
                  h={'1.8rem'}
                >
                  Compare
                </Button>
              </Flex>
              <Flex mt={'.8rem'} gap={'.5rem'} wrap={'wrap'}>
                {datesFilter?.map((item) => {
                  const isActive = item.name === dateRange.name;
                  return (
                    <DateFilterItem
                      key={item.value}
                      item={item.name}
                      onClick={() => {
                        setDateRange(item);
                        setDateFilter(buildDateRange(item.value));
                      }}
                      isActive={isActive}
                    />
                  );
                })}
              </Flex>
              <Box
                mt={'1.2rem'}
                bg={'white'}
                rounded={'0.7rem'}
                p={'0.9rem'}
                border={'1px solid'}
                borderColor={'#EEF0F4'}
              >
                <Text fontWeight={600} fontSize={'.9rem'}>
                  Current selection
                </Text>
                <Text fontSize={'.85rem'} color={'#6B7280'}>
                  {dateRange.name}
                </Text>
                <Text mt={'.4rem'} fontSize={'.75rem'} color={'#94A3B8'}>
                  Previous: {previousRangeLabel}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'1.2rem'}>
          <Box
            bg={'white'}
            rounded={'0.9rem'}
            p={'1rem'}
            border={'1px solid'}
            borderColor={'#EEF0F4'}
            boxShadow={'0 8px 20px rgba(17, 64, 111, 0.06)'}
          >
            <Text fontSize={'.75rem'} color={'#94A3B8'} textTransform={'uppercase'}>
              Completion rate
            </Text>
            <Text fontSize={'1.4rem'} fontWeight={700} color={'#0F172A'}>
              {completedValue}%
            </Text>
            <Text fontSize={'.8rem'} color={'#6B7280'}>
              Completed verifications in range
            </Text>
          </Box>
          <Box
            bg={'white'}
            rounded={'0.9rem'}
            p={'1rem'}
            border={'1px solid'}
            borderColor={'#EEF0F4'}
            boxShadow={'0 8px 20px rgba(17, 64, 111, 0.06)'}
          >
            <Text fontSize={'.75rem'} color={'#94A3B8'} textTransform={'uppercase'}>
              Revenue
            </Text>
            <Text fontSize={'1.4rem'} fontWeight={700} color={'#0F172A'}>
              {formattedRevenue}
            </Text>
            <Text fontSize={'.8rem'} color={'#6B7280'}>
              Gross revenue captured
            </Text>
          </Box>
          <Box
            bg={'white'}
            rounded={'0.9rem'}
            p={'1rem'}
            border={'1px solid'}
            borderColor={'#EEF0F4'}
            boxShadow={'0 8px 20px rgba(17, 64, 111, 0.06)'}
          >
            <Text fontSize={'.75rem'} color={'#94A3B8'} textTransform={'uppercase'}>
              Verification change
            </Text>
            <Text fontSize={'1.4rem'} fontWeight={700} color={'#0F172A'}>
              {formattedVerificationDelta}
            </Text>
            <Text fontSize={'.8rem'} color={'#6B7280'}>
              vs previous period
            </Text>
          </Box>
        </SimpleGrid>

        <Box
          p={{ base: '1rem', md: '1.5rem' }}
          bg={'white'}
          rounded={'1rem'}
          border={'1px solid'}
          borderColor={'#EEF0F4'}
          boxShadow={'0 10px 30px rgba(17, 64, 111, 0.06)'}
        >
          <Flex
            mb={'1.2rem'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box>
              <Text fontFamily={'heading'} fontWeight={700} fontSize={'1.3rem'}>
                Metrics snapshot
              </Text>
              <Text fontSize={'.85rem'} color={'#6B7280'}>
                Updated based on the selected range.
              </Text>
            </Box>
          </Flex>
          {metricsLoading ? (
            <LogoLoader h={'30rem'} w={'100%'} />
          ) : (
            <Grid
              templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }}
              gap={'1.5rem'}
              alignItems={'stretch'}
            >
              <GridItem colSpan={{ base: 12, lg: 8 }}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={'1.5rem'}
                >
                  <ChartCard
                    name="TOTAL VERIFICATIONS"
                    value={businessMetrics?.data?.totalVerifications}
                    changePercent={totalVerificationsChange}
                  />
                  <ChartCard
                    name="BUSINESSES"
                    chart="line"
                    value={businessMetrics?.data?.totalBusinesses}
                    changePercent={totalBusinessesChange}
                  />
                  <ChartCard
                    name="PARTNERS"
                    value={businessMetrics?.data?.totalPartners}
                    changePercent={totalPartnersChange}
                  />
                  <ChartCard
                    name="AGENTS"
                    value={businessMetrics?.data?.totalAgents}
                    changePercent={totalAgentsChange}
                  />
                </SimpleGrid>
              </GridItem>
              <GridItem colSpan={{ base: 12, lg: 4 }}>
                <Box
                  bg={'#F7F9FC'}
                  rounded={'0.9rem'}
                  p={{ base: '1rem', md: '1.2rem' }}
                  border={'1px solid'}
                  borderColor={'#EEF0F4'}
                  h={'100%'}
                  display={'flex'}
                  flexDir={'column'}
                  justifyContent={'space-between'}
                >
                  <Flex alignItems={'center'} gap={'.5rem'}>
                    <MetricsSvg />
                    <Text fontSize={'.85rem'} color={'#6B7280'} fontWeight={700}>
                      Verifications report
                    </Text>
                  </Flex>
                  <Stack mt={'1.2rem'} spacing={'.9rem'}>
                    <VStack align={'flex-start'} spacing={'.2rem'}>
                      <Text
                        fontSize={'1.7rem'}
                        fontWeight={700}
                        color={'#1F2937'}
                      >
                        {completedValue}%
                      </Text>
                      <Text fontSize={'.85rem'} color={'#6B7280'}>
                        Verifications completed
                      </Text>
                    </VStack>
                    <Progress
                      value={completedValue}
                      size={'sm'}
                      borderRadius={'full'}
                      colorScheme={'green'}
                      bg={'white'}
                    />
                    <VStack align={'flex-start'} spacing={'.2rem'}>
                      <Text
                        fontSize={'1.3rem'}
                        fontWeight={700}
                        color={'#1F2937'}
                      >
                        {formattedRevenue}
                      </Text>
                      <Text fontSize={'.85rem'} color={'#6B7280'}>
                        Revenue
                      </Text>
                    </VStack>
                  </Stack>
                </Box>
              </GridItem>
            </Grid>
          )}
        </Box>

        <Box
          bg={'white'}
          rounded={'1rem'}
          border={'1px solid'}
          borderColor={'#EEF0F4'}
          boxShadow={'0 10px 30px rgba(17, 64, 111, 0.06)'}
          overflow={'hidden'}
        >
          {isLoading ? (
            <LogoLoader h={'30rem'} w={'100%'} />
          ) : (
            <CustomTable
              tableHeader={
                <Box pt={'1rem'} px={'1.2rem'}>
                  <Text fontWeight={600} color={'#111827'}>
                    Recent verifications
                  </Text>
                  <Text fontSize={'.85rem'} color={'#6B7280'}>
                    Latest activity across verification requests.
                  </Text>
                </Box>
              }
              columnDef={columnDef}
              data={arrayData}
              filter={{
                tableName: 'Recent Service History',
              }}
              total={arrayData?.length || 0}
              tableOptions={{
                manualPagination: true,
                getCoreRowModel: getCoreRowModel(),
                getPaginationRowModel: getPaginationRowModel(),
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
