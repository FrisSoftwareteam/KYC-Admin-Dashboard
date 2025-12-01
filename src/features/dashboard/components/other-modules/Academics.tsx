import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomTable from '@/components/table/CustomTable';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { unAssignedcolumnDef, assignedcolumnDef } from './columndef';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import { TabContainer } from './Tabs';
import { TuseModulesHook } from '../../hooks/useModulesHook';

export function Academics({ hook }: { hook: TuseModulesHook }) {
  const { headertabs, isLoading, data, filter } = hook;

  return (
    <Box py={'3rem'} pb={'10rem'}>
      <Flex pr={'3rem'} alignItems={'center'} justifyContent={'space-between'}>
        <TabContainer tabs={headertabs} />
      </Flex>

      <Box bg={'white'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader total={data?.data.meta.total} />}
            columnDef={
              filter.status === 'created'
                ? unAssignedcolumnDef
                : assignedcolumnDef
            }
            data={data?.data?.verifications}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
          />
        )}
      </Box>
      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
}
