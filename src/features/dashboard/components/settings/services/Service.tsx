import CustomTable from '@/components/table/CustomTable';
import React from 'react';
import TableHeader from './TableHeader';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { userData } from '@/data/users';
import { Box } from '@chakra-ui/react';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { columnDef } from './columnDef';
import { useGetServicesApi } from '@/features/dashboard/api/service/get-services';

export default function Service() {
  const { data: GAUapi, isLoading: GAUloading } = useGetServicesApi();
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
    <div>
      <Box bg={'white'}>
        {GAUloading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader />}
            sorting={sorting}
            pagination={pagination}
            setSorting={setSorting}
            setPagination={setPagination}
            columnDef={columnDef}
            data={GAUapi?.data}
            filter={{
              tableName: 'Users',
            }}
            total={userData?.data?.UsersData.length || 0}
            tableOptions={{
              pageCount: Math.ceil(
                Number(userData?.data?.UsersData.length) /
                  Number(pagination.pageSize)
              ),
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
    </div>
  );
}
