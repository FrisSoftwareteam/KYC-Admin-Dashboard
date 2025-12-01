import { Box, Flex } from '@chakra-ui/react';
import { TabContainer } from './Tabs';
import { useModulesHook } from '../../hooks/useModulesHook';
// import { Academics } from './Academics';
import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomTable from '@/components/table/CustomTable';
import { unAssignedcolumnDef, assignedcolumnDef } from './columndef';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import { ViewData } from './ViewData';

export function Modules() {
  const hook = useModulesHook();
  const { tabs, filter, headertabs, isLoading, data } = hook;

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      <Flex pr={'3rem'} alignItems={'center'} justifyContent={'space-between'}>
        <TabContainer tabs={tabs} />
      </Flex>

      <Box py={'3rem'} pb={'10rem'}>
        <Flex
          pr={'3rem'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
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
                  ? unAssignedcolumnDef(hook)
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

      <ViewData hook={hook} />
      {/* {filter.type === 'academics' && <Academics hook={hook} />} */}
    </Box>
  );
}
