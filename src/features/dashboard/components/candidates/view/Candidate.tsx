import React, { useEffect, useState } from 'react';
import Top from './Top';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomTable from '@/components/table/CustomTable';
import { IVerification } from '@/shared/interface/verification';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { columnDef } from './columndef';
import TableHeader from './Tableheader';
import CandidateInformation from '../../businesses/businessesdetails/CandidateInformation';
import { useGetCandidateByIdApi } from '@/features/dashboard/api/candidate/get-candidate-by-id';
import { useGetCandidateBusinessesApi } from '@/features/dashboard/api/candidate/get-candidate-businesses';
import { useGetCandidateVerificationsApi } from '@/features/dashboard/api/candidate/get-candidate-verifications';

export function Candidate() {
  const { id } = useParams();
  const [businesses, setBusinesses] = useState<any>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(
    businesses?.[0]?._id
  );
  const { data: GCPaoi, isLoading: GCPloading } = useGetCandidateByIdApi(
    id as string,
    {
      enabled: Boolean(id),
    }
  );
  const { data: CBapi, isLoading: CBloading } = useGetCandidateBusinessesApi(
    id as string,
    {
      enabled: Boolean(id),
    }
  );

  const { data: GCVapi, isLoading: GCVloading } =
    useGetCandidateVerificationsApi(id as string, selectedBusiness, {
      enabled: Boolean(id) && Boolean(selectedBusiness),
    });

  const arrayData: Array<IVerification> | undefined = GCVapi?.data?.tasks?.map(
    (item) => ({
      status: item?.status,
      _id: item?._id,
      date: item?.createdAt,
      type: item?.verificationType,
      name: `${item?.candidate?.firstName} ${item?.candidate?.lastName}`,
      cost: item.cost,
    })
  );

  const isLoading = CBloading || GCPloading || GCVloading;
  useEffect(() => {
    if (!CBapi?.data.length) return;
    setBusinesses(
      CBapi.data?.map((item) => ({
        label: item.name,
        value: item._id,
      }))
    );
    setSelectedBusiness(CBapi.data[0]?._id);
  }, [CBapi]);
  if (isLoading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }
  return (
    <div>
      <Top name={`${GCPaoi?.data?.firstName} ${GCPaoi?.data?.lastName}`} />
      <Box m={'1.5rem'}>
        <CandidateInformation {...(GCPaoi?.data as any)} />
      </Box>

      {Boolean(CBapi?.data?.length) && (
        <Box mx={'1.5rem'} bg={'white'} rounded={'.4rem'}>
          <CustomTable
            tableHeader={
              <TableHeader
                name={`${GCPaoi?.data?.firstName} ${GCPaoi?.data?.lastName}`}
                options={businesses}
                setSelectedBusiness={setSelectedBusiness}
              />
            }
            columnDef={columnDef}
            data={arrayData}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={GCVapi?.data.meta.total}
            tableOptions={{
              pageCount: GCVapi?.data?.meta?.lastPage,
              manualPagination: true,
              getCoreRowModel: getCoreRowModel(),
              getPaginationRowModel: getPaginationRowModel(),
            }}
          />
        </Box>
      )}
    </div>
  );
}
