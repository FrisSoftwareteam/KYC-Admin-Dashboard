import CustomTable from '@/components/table/CustomTable';
import { Box } from '@chakra-ui/react';
import React from 'react';
import TableHeader from './TableHeader';
import { useCandidatePaginateHook } from '../../hooks/useCandidatePaginateHook';
import { columnDef } from './columnDef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { LogoLoader } from '@/components/elements/loader/Loader';
import TableFooter from './TableFooter';

export function Candidates() {
  const { data, isLoading, arrayData } = useCandidatePaginateHook();

  return (
    <Box mb={'2rem'}>
      <Box my={'2rem'} mx={'1.5rem'} bg={'white'} rounded={'.4rem'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader total={data?.data.meta.total} />}
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
            }}
          />
        )}
      </Box>
      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
}
