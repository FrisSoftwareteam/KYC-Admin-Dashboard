import React from 'react';
import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import CustomTable from '@/components/table/CustomTable';
import { columnDef } from './columndef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useAddressesHook } from '../../hooks/useAddressesHook';
import { ReactComponent as BadgeSvg } from '@/assets/badge.svg';

export const Addresses: React.FC = () => {
  const {
    data,
    isLoading,
    setPagination,
    pagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    statusTabs,
  } = useAddressesHook();

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      <Box gap={'24px'} mb={'16px'}>
        {statusTabs && (
          <Flex bg={'reed'} gap={'1rem'} mb={'16px'}>
            {statusTabs.map(({ isActive, onClick, name, total }) => (
              <HStack
                key={name}
                cursor={'pointer'}
                onClick={onClick}
                py={'32px'}
                px={'20px'}
                bg={isActive ? '#F5A6231A' : '#EAEAEA'}
                w={'auto'}
                gap={'1.5rem'}
                borderColor={isActive ? '#F5A623B2' : '#D4D4D4'}
                borderWidth={'1px'}
                borderRadius={'4px'}
                flex={1}
              >
                <VStack bg={'r ed'} alignItems={'flex-start'}>
                  <Text
                    fontWeight={700}
                    fontSize={'12px'}
                    textTransform={'uppercase'}
                    color={'#828282'}
                  >
                    {`${name}`}
                  </Text>
                  <Text fontWeight={500} fontSize={'24px'}>
                    {total}
                  </Text>
                </VStack>
                <Center
                  minH={'56px'}
                  minW={'56px'}
                  bg={isActive ? '#F5A62326' : '#D4D4D4B2'}
                  borderRadius={'full'}
                >
                  <BadgeSvg color={isActive ? '#F5A623B2' : '#B6B6B6'} />
                </Center>
              </HStack>
            ))}
          </Flex>
        )}
      </Box>

      <Box position={'relative'} bg={'white'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={
              <TableHeader
                rowSelection={rowSelection}
                total={data?.data.meta.total}
              />
            }
            sorting={sorting}
            pagination={pagination}
            setSorting={setSorting}
            setPagination={setPagination}
            columnDef={columnDef}
            data={data?.data?.addresses || []}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
            tableOptions={{
              pageCount: 1,
              manualPagination: true,
              getCoreRowModel: getCoreRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
              onRowSelectionChange: setRowSelection,
              onPaginationChange: setPagination,
              state: {
                rowSelection,
                pagination,
              },
            }}
          />
        )}
      </Box>

      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
};
