import { Box } from '@chakra-ui/react';
import React from 'react';
import Head from './Head';
import CustomTable from '@/components/table/CustomTable';
import TableHeader from './TableHeader';
import { columnDef } from './columndef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { useTransactionsHook } from '../../hooks/useTransactionHook';
import { LogoLoader } from '@/components/elements/loader/Loader';

export function Transaction() {
  const { arrayData, data, isLoading } = useTransactionsHook();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);
  return (
    <Box p={'1.5rem'}>
      <Head />
      {isLoading ? (
        <LogoLoader h={'40rem'} w={'100%'} />
      ) : (
        <Box mt={'1.5rem'} bg={'white'}>
          <CustomTable
            tableHeader={<TableHeader />}
            sorting={sorting}
            pagination={pagination}
            setSorting={setSorting}
            setPagination={setPagination}
            columnDef={columnDef}
            data={arrayData}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
            tableOptions={{
              pageCount: data?.data?.meta?.lastPage,

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
        </Box>
      )}
      {/* <TableFooter /> */}
    </Box>
  );
}
