import { useRecoilState } from 'recoil';
import { AddressesFilterState } from '../store/verifications/address-filter';
import { useGetAllAddressesApi } from '../api/address/get-all-address';
import { useState } from 'react';
import { useGetAddressMetricsQuery } from '../api/verifications/address-metrics';

export const useAddressesHook = () => {
  const [filter, setFilter] = useRecoilState(AddressesFilterState);
  const { data, isLoading } = useGetAllAddressesApi();
  const { data: AddressMetrics, isLoading: AddressMetricsLoading } =
    useGetAddressMetricsQuery();
  const isPending = filter.status === 'accepted' || filter.status === 'created';
  const [rowSelection, setRowSelection] = useState({});

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
  const statusTabs = [
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalVerifications,
      name: 'All',
      onClick: () =>
        setFilter({
          ...filter,
          status: '',
          page: 1,
        }),
      isActive: filter.status === '',
    },
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalApprovedVerifications,
      name: 'Approved',
      isActive: filter.status === 'reviewed',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'reviewed',
          page: 1,
        }),
    },
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalPendingVerification,
      name: 'Pending Approval',
      isActive: filter.status === 'pending-review',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'pending-review',
          page: 1,
        }),
    },
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalUnderTATVerification,
      name: 'Pending Within TAT',
      isActive: filter.status === 'under-tat',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'under-tat',
          page: 1,
        }),
    },
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalOverTATVerification,
      name: 'Pending Outside TAT',
      isActive: filter.status === 'over-tat',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'over-tat',
          page: 1,
        }),
    },
    {
      total: AddressMetricsLoading
        ? '--'
        : AddressMetrics?.data?.totalRejectedVerification,
      name: 'Rejected',
      isActive: filter.status === 'rejected',

      onClick: () =>
        setFilter({
          ...filter,
          status: 'rejected',
          page: 1,
        }),
    },
  ];
  return {
    filter,
    setFilter,
    data,
    isLoading: isLoading,
    setPagination,
    pagination,
    sorting,
    setSorting,
    isPending,
    rowSelection,
    setRowSelection,
    statusTabs,
  };
};
