import {
  Center,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import { FiFilter, FiRefreshCcw } from 'react-icons/fi';
import Filter from './Filter';
import { useNavigate } from 'react-router-dom';
import { useGetAllBusinessesApi } from '../../api/business/get-all-businesses';

export default function TableHeader({ total }: { total?: number }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();

  const { refetch } = useGetAllBusinessesApi();

  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
      pr={'2.81rem'}
    >
      <Text fontWeight={500} fontSize={'.8rem'}>
        {total} Businesses
      </Text>

      <Flex alignItems={'center'} gap={'1rem'}>
        <Box onClick={() => refetch()} cursor={'pointer'}>
          <FiRefreshCcw />
        </Box>

        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Center
              boxShadow="0px 1px 8px 0px #0A008214"
              w={'4rem'}
              h={'1.5rem'}
              gap={'.3rem'}
              cursor={'pointer'}
              rounded={'.3rem'}
            >
              <FiFilter fontSize={'.8rem'} />
              <Text fontWeight={500} fontSize={'.7rem'}>
                Filter
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
                '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A',
            }}
            boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A"
          >
            <PopoverArrow />
            <Filter />
          </PopoverContent>
        </Popover>

        <Button onClick={() => navigate('add')}>Add a business</Button>

        {/* <Button>Refresh</Button> */}
      </Flex>
    </Flex>
  );
}
