import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { TabContainer } from './Tabs';
import CustomTable from '@/components/table/CustomTable';
import { assignedcolumnDef, unAssignedcolumnDef } from './columndef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import { LogoLoader } from '@/components/elements/loader/Loader';
// import { ReactComponent as BadgeSvg } from '@/assets/badge.svg';
import { useVerificationsHook } from '../../hooks/useVerificationsHook';

export const Verifications: React.FC = () => {
  const {
    data,
    isLoading,
    filter,
    setPagination,
    pagination,
    // statusTabs,
    sorting,
    setSorting,
    tabs,
    // isPending,
  } = useVerificationsHook();

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      <Flex pr={'3rem'} alignItems={'center'} justifyContent={'space-between'}>
        <TabContainer tabs={tabs} />
      </Flex>

      <Box bg={'white'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader total={data?.data.meta.total} />}
            sorting={sorting}
            pagination={pagination}
            setSorting={setSorting}
            setPagination={setPagination}
            columnDef={
              filter.status === 'created'
                ? unAssignedcolumnDef
                : assignedcolumnDef
            }
            data={data?.data?.tasks}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
            tableOptions={{
              pageCount: 1,
              manualPagination: true,
              getCoreRowModel: getCoreRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
              // getPaginationRowModel: getPaginationRowModel(),
              onPaginationChange: setPagination,
              state: {
                //...
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
