import React from 'react';
import { Box } from '@chakra-ui/react';
import CustomTable from '@/components/table/CustomTable';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { columnDef } from './columndef';
import { usePartnersHook } from '../../hooks/usePartnersHook';
import TableFooter from './TableFooter';

export const Partner: React.FC = () => {
  const {
    data,
    isLoading,
    // setFilter,
    // filter,
  } = usePartnersHook();

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      <Box bg={'white'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader total={data?.data.meta.total} />}
            columnDef={columnDef}
            data={data?.data?.partners || []}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
            tableOptions={{
              pageCount: data?.data?.meta?.lastPage,
              manualPagination: true,
              getCoreRowModel: getCoreRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
            }}
          />
        )}
      </Box>
      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
};
