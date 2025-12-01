import CustomInput from '@/components/input/CustomInput';
// import CustomSelect from '@/components/input/CustomSelect';
// import { StatusTypeOptions } from '@/data/options/status';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { PartnerVerificationsFilterState } from '../../store/partner/partner-verification-filter';
import { datesFilter } from '@/data/datefilter';
import DateFilterItem from '@/components/elements/DateFilter/DateFilterItem';
import { getLastNDaysDates } from '@/utils/date-formater';

export default function Filter() {
  const [filter, setFilter] = useRecoilState(PartnerVerificationsFilterState);
  const resetFilter = useResetRecoilState(PartnerVerificationsFilterState);
  const [tempFilter, setTempFilter] = useState({
    status: filter.status,
    search: filter.search,
    customEndDate: filter.customEndDate,
    customStartDate: filter.customStartDate,
  });

  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const px = '1.4rem';
  const applyFilter = () => {
    setFilter({ ...filter, ...tempFilter, page: 1 });
  };

  const clearFilter = () => {
    resetFilter();
    setTempFilter({
      status: filter.status,
      search: filter.search,
      customEndDate: filter.customEndDate,
      customStartDate: filter.customStartDate,
    });
  };

  return (
    <Box>
      <Text
        pt={'1.8rem'}
        pb={'.8rem'}
        px={px}
        fontFamily={'heading'}
        color={'#4F4F4F'}
        fontSize={'.7rem'}
      >
        Filters
      </Text>

      <Divider borderColor={'#E5E9EC'} />
      <Stack spacing={'1.2rem'} px={px} py={'1.5rem'}>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Date range
          </Text>
          <Flex mt={'.3rem'} justifyContent={'space-between'} flexWrap={'wrap'}>
            {datesFilter?.map((item) => {
              const isActive = item.value === dateRange?.value;
              return (
                <DateFilterItem
                  key={item.name}
                  item={item.name}
                  onClick={() => {
                    setDateRange(item);
                    const { customEndDate, customStartDate } =
                      getLastNDaysDates(item.value);
                    setTempFilter({
                      ...tempFilter,
                      customEndDate,
                      customStartDate,
                    });
                  }}
                  isActive={isActive}
                />
              );
            })}
          </Flex>
        </Box>

        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Partner’s name
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                value: tempFilter.search,
                onChange: (e) =>
                  setTempFilter({
                    ...tempFilter,
                    search: e.target.value,
                  }),
                type: 'text',
                placeholder: 'Partner’s name',
              }}
              formControlProps={{ isRequired: true }}
            />
          </Box>
        </Box>
        {/* <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Status
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={StatusTypeOptions}
              onChange={(val) => {
                setTempFilter({
                  ...tempFilter,
                  status: val.value?.toLowerCase(),
                });
              }}
              defaultValue={
                StatusTypeOptions.find(
                  (item) => item.value === filter.status
                ) || StatusTypeOptions[0]
              }
            />
          </Box>
        </Box> */}
      </Stack>
      <Divider borderColor={'#E5E9EC'} />
      <Flex
        px={px}
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'1.5rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.8rem'}
          maxW={'6rem'}
          variant={'outline'}
          onClick={clearFilter}
        >
          Clear filter
        </Button>
        <Button onClick={applyFilter} fontSize={'.8rem'} maxW={'6rem'}>
          Apply filter
        </Button>
      </Flex>
    </Box>
  );
}
