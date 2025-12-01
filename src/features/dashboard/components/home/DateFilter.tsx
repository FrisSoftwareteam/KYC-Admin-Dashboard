import CustomInput from '@/components/input/CustomInput';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { VerificationFilterState } from '../../store/verifications/filter';
import DateFilterItem from '@/components/elements/DateFilter/DateFilterItem';
import { BsArrowRight } from 'react-icons/bs';

export default function DateFilter() {
  const [filter, setFilter] = useRecoilState(VerificationFilterState);
  const resetFilter = useResetRecoilState(VerificationFilterState);
  const [tempFilter, setTempFilter] = useState({
    status: filter.status,
    type: filter.type,
    search: filter.search,
  });

  const datesFilter = ['Today', 'Last 7 days', '30 days', '1 year'] as const;
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>('Last 7 days');
  const px = '1.4rem';

  const applyFilter = () => {
    setFilter({ ...filter, ...tempFilter });
  };

  const clearFilter = () => {
    resetFilter();
    setTempFilter({
      status: filter.status,
      type: filter.type,
      search: filter.search,
    });
  };
  return (
    <Box>
      <Text
        pt={'1.2rem'}
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
          <Text
            fontFamily={'body'}
            fontWeight={'500'}
            fontSize={'14px'}
            mb={{ base: '6px' }}
            color={'#828282'}
          >
            Date range
          </Text>
          <Flex mt={'.3rem'} justifyContent={'space-between'} flexWrap={'wrap'}>
            {datesFilter?.map((item) => {
              const isActive = item === dateRange;
              return (
                <DateFilterItem
                  key={item}
                  item={item}
                  onClick={() => setDateRange(item)}
                  isActive={isActive}
                />
              );
            })}
          </Flex>
        </Box>

        <Box>
          <Text
            fontFamily={'body'}
            fontWeight={'500'}
            fontSize={'14px'}
            mb={{ base: '6px' }}
            color={'#828282'}
          >
            Custom date range
          </Text>

          <Flex gap={'.9rem'} alignItems={'center'}>
            <CustomInput
              // errorMessage={errors.email}
              // touched={touched.email}
              inputProps={{
                name: 'email',
                type: 'date',
                placeholder: 'valerie@example.com',
                //   value: values.email,
                //   onChange: handleChange,
                //   isInvalid: Boolean(errors.email && touched.email),
                //   onBlur: handleBlur,
              }}
            />
            <Box>
              <BsArrowRight />
            </Box>
            <CustomInput
              // errorMessage={errors.email}
              // touched={touched.email}
              inputProps={{
                name: 'email',
                type: 'date',
                placeholder: 'valerie@example.com',
                //   value: values.email,
                //   onChange: handleChange,
                //   isInvalid: Boolean(errors.email && touched.email),
                //   onBlur: handleBlur,
              }}
            />
          </Flex>
        </Box>
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
