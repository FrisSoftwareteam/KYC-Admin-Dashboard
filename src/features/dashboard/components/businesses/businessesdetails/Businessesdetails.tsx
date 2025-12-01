import { Box, Stack, useDisclosure } from '@chakra-ui/react';
// import { useParams } from 'react-router-dom';
import Head from './Head';
import CandidateInformation from './CandidateInformation';
import VerificationInformation from './VerificationInformation';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useParams } from 'react-router-dom';
import CustomTable from '@/components/table/CustomTable';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import CustomModal from '@/components/ui/CustomModal';
import { DisableBusiness } from './DisableBusiness';
import { InactiveBusiness } from './InactiveBusiness';
import { useGetBusinessByIdApi } from '@/features/dashboard/api/business/get-business-by-id';
import { useGetSingleBusinessVerificationsApi } from '@/features/dashboard/api/business/get-business-verifications';
import { columnDef } from './columndef';
import { ManageFinances } from './ManageFinances';
import { useDisableBusinessApi } from '@/features/dashboard/api/business/disable-business';
import { useRestoreBusinessApi } from '@/features/dashboard/api/business/restore-business';
import { FundBusiness } from './FundBusiness';

export function Businessesdetails() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetBusinessByIdApi(id as string, {
    enabled: Boolean(id),
  });

  const { data: GBVapi, isLoading: GVloading } =
    useGetSingleBusinessVerificationsApi(id as string, {
      enabled: Boolean(id),
    });

  const { mutateAsync: disableMutate, isLoading: disableIsLoading } =
    useDisableBusinessApi();
  const { mutateAsync: restoreMutate, isLoading: restoreIsLoading } =
    useRestoreBusinessApi();

  const inactiveDisclosure = useDisclosure();
  const disableDisclosure = useDisclosure();
  const feeDisclosure = useDisclosure();
  const fundDisclosure = useDisclosure();

  const handleSubmit = async () => {
    data?.data?.active
      ? await disableMutate(id as string)
      : await restoreMutate(id as string);
    await refetch();
    disableDisclosure.onClose();
  };

  const isSubmiting = disableIsLoading || restoreIsLoading;

  // const { isLoading, data } = useGetVerificationByIdApi(id as string);

  const actionlist = [
    {
      isLink: true,
      name: 'Edit business',
      color: '#4F4F4F',
      path: `/business/${id}/edit`,
    },
    {
      isLink: false,
      name: 'Manage financials',
      color: '#4F4F4F',
      clickFn: () => feeDisclosure.onOpen(),
    },
    {
      isLink: false,
      name: 'Fund business',
      color: '#4F4F4F',
      clickFn: () => fundDisclosure.onOpen(),
    },
    // {
    //   isLink: false,
    //   name: 'Make business inactive',
    //   color: '#4F4F4F',
    //   clickFn: () => inactiveDisclosure.onOpen(),
    // },

    {
      isLink: false,
      name: data?.data?.active ? 'Disable partner' : 'Restore partner',
      color: data?.data?.active ? '#D0021B' : '#10B759',
      clickFn: () => disableDisclosure.onOpen(),
    },
  ];

  if (isLoading || GVloading) {
    return <LogoLoader />;
  }

  return (
    <Box>
      <Head actionlist={actionlist} name={`${data?.data?.name}`} />
      <Stack p={'1.5rem'} pt={'1rem'} spacing={'1.2rem'}>
        <VerificationInformation />
        <CandidateInformation data={data} />
        <Box bg={'white'}>
          <CustomTable
            tableHeader={<TableHeader total={GBVapi?.data?.meta?.total} />}
            columnDef={columnDef}
            data={GBVapi?.data?.tasks || []}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={GBVapi?.data.meta.total}
            tableOptions={{
              pageCount: GBVapi?.data?.meta?.lastPage,
              manualPagination: true,
              getCoreRowModel: getCoreRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
            }}
          />
        </Box>
        <TableFooter meta={GBVapi?.data?.meta} />
      </Stack>

      <CustomModal
        isOpen={disableDisclosure.isOpen}
        onClose={disableDisclosure.onClose}
        headertext={'Disable business'}
        children={
          <DisableBusiness
            name={`${data?.data?.mainUser?.firstName} ${data?.data?.mainUser?.lastName}`}
            status={data?.data?.active as boolean}
            handleSubmit={handleSubmit}
            isLoading={isSubmiting}
          />
        }
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
        isOpen={fundDisclosure.isOpen}
        onClose={fundDisclosure.onClose}
        headertext={'Fund Business'}
        children={<FundBusiness onClose={fundDisclosure.onClose} />}
        modalWidth={'30.125rem'}
      />
      <CustomModal
        isOpen={inactiveDisclosure.isOpen}
        onClose={inactiveDisclosure.onClose}
        headertext={'Make business inactive'}
        children={
          <InactiveBusiness
            name={`${data?.data?.mainUser?.firstName} ${data?.data?.mainUser?.lastName}`}
          />
        }
        modalWidth={'30.125rem'}
      />
    </Box>
  );
}
