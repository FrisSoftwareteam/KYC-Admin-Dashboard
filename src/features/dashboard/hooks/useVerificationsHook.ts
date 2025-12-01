import { useRecoilState } from 'recoil';
import { VerificationFilterState } from '../store/verifications/filter';
import { useGetAllVerificationsApi } from '../api/verifications/get-all-verifications';
import { IVerification } from '@/shared/interface/verification';
import { TabProps } from '../components/verifications/Tabs';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

export const useVerificationsHook = () => {
  const [filter, setFilter] = useRecoilState(VerificationFilterState);
  const { data, isLoading } = useGetAllVerificationsApi();
  // const { data: GPMapi, isLoading: GPMloading } = useGetPartnerMetricsApi();
  const isPending = filter.status === 'accepted' || filter.status === 'created';
  const disableDisclosure = useDisclosure();
  const inactiveDisclosure = useDisclosure();
  const feeDisclosure = useDisclosure();

  const [sorting, setSorting] = useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const arrayData: Array<IVerification> | undefined = data?.data?.tasks?.map(
    (item) => ({
      status: item?.status,
      _id: item?._id,
      date: item?.createdAt,
      type: item?.verificationType,
      name: `${item?.candidate?.email} ${item?.candidate?.lastName}`,
    })
  );

  const tabs: TabProps[] = [
    {
      label: 'Pending Verifications',
      isActive: isPending,
      onClick: () => setFilter({ ...filter, status: 'created', page: 1 }),
    },
    {
      label: 'Verifications in Progress',
      isActive: filter.status === 'inprogress',
      onClick: () => setFilter({ ...filter, status: 'inprogress', page: 1 }),
    },
    {
      label: 'Completed Verifications',
      isActive: filter.status === 'completed',
      onClick: () => setFilter({ ...filter, status: 'completed', page: 1 }),
    },
  ];

  // const statusTabs = [
  //   {
  //     total: GPMapi?.data?.totalUnassignVerification,
  //     name: 'unassigned',
  //     onClick: () =>
  //       setFilter({
  //         ...filter,
  //         status: 'created',
  //         page: 1,
  //       }),
  //     isActive: filter.status === 'created',
  //   },
  //   {
  //     total: GPMapi?.data?.totalAssignedVerification,
  //     name: 'assigned',
  //     isActive: filter.status === 'accepted',

  //     onClick: () =>
  //       setFilter({
  //         ...filter,
  //         status: 'accepted',
  //         page: 1,
  //       }),
  //   },
  // ];

  return {
    filter,
    data,
    tabs,
    isLoading: isLoading,
    isPending,
    arrayData,
    // statusTabs,
    disableDisclosure,
    inactiveDisclosure,
    feeDisclosure,
    sorting,
    pagination,
    setFilter,
    setSorting,
    setPagination,
  };
};
