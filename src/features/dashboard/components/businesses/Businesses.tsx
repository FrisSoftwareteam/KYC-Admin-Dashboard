import React from 'react';
import { Box } from '@chakra-ui/react';
import CustomTable from '@/components/table/CustomTable';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableFooter from './businessesdetails/TableFooter';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { columnDef } from './columndef';
import { useBusinessHook } from '../../hooks/useBusinessHook';

export const Businesses: React.FC = () => {
  const { data, isLoading } = useBusinessHook();

  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
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
            columnDef={columnDef}
            data={data?.data?.businesses}
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
        )}
      </Box>
      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
};
