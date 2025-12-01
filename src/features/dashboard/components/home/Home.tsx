import ChartCard from '@/components/cards/ChartCard';
import CustomTable from '@/components/table/CustomTable';
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import React, { useState } from 'react';
import { columnDef } from './columndef';
import { useGetRecentVerificationApi } from '../../api/verifications/recent-verification';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { IVerification } from '@/shared/interface/verification';
import { useAdminMetricsApi } from '../../api/get-metrics';
import { datesFilter } from '@/data/datefilter';
import DateFilterItem from '@/components/elements/DateFilter/DateFilterItem';
import { getLastNDaysDates } from '@/utils/date-formater';
import { ReactComponent as MetricsSvg } from '@/assets/metrics.svg';

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
  const [dateFilter, setDateFilter] = useState<any>({});
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const { data: businessMetrics, isLoading: metricsLoading } =
    useAdminMetricsApi(dateFilter);
  return (
    <Box p={'1.5rem'}>
      <Box p={'1.5rem'} bg={'white'} rounded={'.4rem'}>
        <Flex
          mb={'1.5rem'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text fontFamily={'heading'} fontWeight={700} fontSize={'1.4rem'}>
            Overview
          </Text>
          <Flex
            mr={'.7rem'}
            gap={'.8rem'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            {datesFilter?.map((item) => {
              const isActive = item.name === dateRange.name;
              return (
                <DateFilterItem
                  key={item.value}
                  item={item.name}
                  onClick={() => {
                    setDateRange(item);
                    const { customEndDate, customStartDate } =
                      getLastNDaysDates(item.value);
                    setDateFilter({ customEndDate, customStartDate });
                  }}
                  isActive={isActive}
                />
              );
            })}
          </Flex>
        </Flex>{' '}
        {/* ============================================== */}
        {metricsLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={'1.5rem'}
          >
            <GridItem colSpan={3}>
              <ChartCard
                name="TOTAL VERIFICATIONS"
                value={businessMetrics?.data?.totalVerifications}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <ChartCard
                name="BUSINESSES"
                chart="line"
                value={businessMetrics?.data?.totalBusinesses}
              />
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Center h={'full'} justifyContent={'flex-start'}>
                <Stack gap={8}>
                  <Flex gap={2}>
                    <MetricsSvg />
                    <Text
                      // color={'#4F4F4F'}
                      // fontSize={'1.5rem'}
                      fontSize={'.8rem'}
                      color={'#828282'}
                      fontWeight={700}
                    >
                      Verifications report
                    </Text>
                  </Flex>

                  <VStack h={'100%'} gap={8}>
                    <Box>
                      <Text
                        color={'#4F4F4F'}
                        fontWeight={700}
                        fontSize={'1.5rem'}
                      >
                        {businessMetrics?.data?.completed}%
                      </Text>
                      <Text fontSize={'.8rem'} color={'#828282'}>
                        Verifications completed
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color={'#4F4F4F'}
                        fontWeight={700}
                        fontSize={'1.5rem'}
                      >
                        ₦{businessMetrics?.data?.revenue}
                      </Text>
                      <Text fontSize={'.8rem'} color={'#828282'}>
                        Revenue
                      </Text>
                    </Box>
                  </VStack>
                </Stack>
              </Center>
            </GridItem>
            <GridItem colSpan={3}>
              <ChartCard
                name="PARTNERS"
                value={businessMetrics?.data?.totalPartners}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <ChartCard
                name="AGENTS"
                value={businessMetrics?.data?.totalAgents}
              />
            </GridItem>
          </Grid>
        )}
      </Box>
      <Box bg={'white'} mt={'1.5rem'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={
              <Text pt={'1rem'} px={'1rem'} fontWeight={500} color={'#4A4A4A'}>
                Recent Verifications
              </Text>
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
    </Box>
  );
}
