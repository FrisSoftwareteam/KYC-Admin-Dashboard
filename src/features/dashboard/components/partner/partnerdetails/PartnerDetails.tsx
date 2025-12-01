import { Box, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import Head from './Head';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useParams } from 'react-router-dom';
import CustomTable from '@/components/table/CustomTable';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import { columnDef } from './columndef';
import TableFooter from './TableFooter';
import CustomModal from '@/components/ui/CustomModal';
import { DisablePartner } from './DisablePartner';
import { InactivePartner } from './InactivePartner';
import { ManageFinances } from './ManageFinances';
import Top from './Top';
import { TabContainer } from '../Tabs';
import { usePartnersHook } from '@/features/dashboard/hooks/usePartnersHook';
import { agentColumnDef } from './agent/column-def';
import ManageAccess from './ManageAccess';

export function PartnerDetails() {
  const { id } = useParams();

  const {
    tabs,
    isLoading,
    pagination,
    feeDisclosure,
    disableDisclosure,
    inactiveDisclosure,
    PLoading,
    PVLoading,
    partner,
    partnerVerifications,
    filter,
    isSubmiting,
    setPagination,
    handleSubmit,
    acessDisclosure,
  } = usePartnersHook();

  const actionlist = [
    {
      isLink: true,
      name: 'Edit partner',
      color: '#4F4F4F',
      path: `/partner/${id}/edit`,
    },
    {
      isLink: false,
      name: 'Manage financials',
      color: '#4F4F4F',
      clickFn: () => feeDisclosure.onOpen(),
    },
    // {
    //   isLink: false,
    //   name: 'Manage Access',
    //   color: '#4F4F4F',
    //   clickFn: () => acessDisclosure.onOpen(),
    // },
    // {
    //   isLink: false,
    //   name: 'Make partner inactive',
    //   color: '#4F4F4F',
    //   clickFn: () => inactiveDisclosure.onOpen(),
    // },
    {
      isLink: false,
      name: partner?.data?.active ? 'Disable partner' : 'Restore partner',
      color: partner?.data?.active ? '#D0021B' : '#10B759',
      clickFn: () => disableDisclosure.onOpen(),
    },
  ];

  if (PVLoading || PLoading) {
    return <LogoLoader />;
  }
  return (
    <Box>
      <Head actionlist={actionlist} name={partner?.data?.name} />
      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        {/* <VerificationInformation
          cost={data?.data?.cost}
          paymentType={data?.data?.paymentType}
          verifications={data?.data?.verificationType}
        /> */}
        <Top />
        {/* <CandidateInformation {...partner?.data} /> */}
        <Box>
          <Flex
            pr={'3rem'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <TabContainer tabs={tabs} />
          </Flex>
          <Box bg={'white'}>
            {isLoading ? (
              <LogoLoader h={'40rem'} w={'100%'} />
            ) : (
              <CustomTable
                tableHeader={
                  <TableHeader
                    total={partnerVerifications?.data?.meta?.total}
                    subText={filter?.name}
                  />
                }
                pagination={pagination}
                setPagination={setPagination}
                columnDef={
                  filter.name === 'verifications' ? columnDef : agentColumnDef
                }
                data={
                  partnerVerifications?.data?.addresses ||
                  partnerVerifications?.data?.agents ||
                  []
                }
                filter={{
                  tableName: 'Recent Service History',
                }}
                total={partnerVerifications?.data?.meta?.total}
                tableOptions={{
                  pageCount: partnerVerifications?.data?.meta?.lastPage,
                  manualPagination: true,
                  getCoreRowModel: getCoreRowModel(),
                  getPaginationRowModel: getPaginationRowModel(),
                }}
              />
            )}
          </Box>
        </Box>
        <TableFooter meta={partnerVerifications?.data?.meta} />
      </Stack>

      <CustomModal
        isOpen={disableDisclosure.isOpen}
        onClose={disableDisclosure.onClose}
        headertext={
          partner?.data?.active ? 'Disable partner' : 'Restore partner'
        }
        children={
          <DisablePartner
            name={partner?.data?.name as string}
            status={partner?.data?.active as boolean}
            handleSubmit={handleSubmit}
            isLoading={isSubmiting}
          />
        }
        modalWidth={'30.125rem'}
      />
      <CustomModal
        isOpen={inactiveDisclosure.isOpen}
        onClose={inactiveDisclosure.onClose}
        headertext={'Make partner inactive'}
        children={<InactivePartner name={partner?.data?.name as string} />}
        modalWidth={'30.125rem'}
      />
      <CustomModal
        isOpen={feeDisclosure.isOpen}
        onClose={feeDisclosure.onClose}
        headertext={'Verification fees'}
        children={<ManageFinances onClose={feeDisclosure.onClose} />}
        modalWidth={'30.125rem'}
      />
      <CustomModal
        isOpen={acessDisclosure.isOpen}
        onClose={acessDisclosure.onClose}
        headertext={'Manage Access'}
        children={<ManageAccess onClose={acessDisclosure.onClose} />}
        modalWidth={'40rem'}
      />
    </Box>
  );
}
