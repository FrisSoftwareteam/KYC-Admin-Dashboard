import {
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import DateFilter from './DateFilter';
import DateFilterItem from '@/components/elements/DateFilter/DateFilterItem';

export default function Top() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const datesFilter = ['Today', 'Last 7 days', '30 days', '1 year'] as const;
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>('Last 7 days');
  return (
    <Flex mb={'1.5rem'} alignItems={'center'} justifyContent={'space-between'}>
      <Text fontWeight={700} fontSize={'1.4rem'}>
        Overview
      </Text>
      <Flex alignItems={'center'} gap={'.8rem'}>
        <Flex
          mr={'.7rem'}
          gap={'.8rem'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
        >
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

        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Center
              border="1px solid #4F4F4F"
              w={'5rem'}
              h={'2rem'}
              gap={'.3rem'}
              cursor={'pointer'}
              rounded={'.3rem'}
              lineHeight={'16px'}
            >
              <FiFilter fontSize={'1rem'} />
              <Text fontWeight={500} fontSize={'.9rem'} color={'#4F4F4F'}>
                Fliter
              </Text>
            </Center>
          </PopoverTrigger>
          <PopoverContent
            w={'23rem'}
            mr={'2rem'}
            rounded={'.5rem'}
            border="none !important"
            outline={'none !important'}
            _focusVisible={{
              boxShadow:
                '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A', // Apply the specified box shadows
            }}
            boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A" // Apply the specified box shadows
          >
            <PopoverArrow />
            <DateFilter />
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}
