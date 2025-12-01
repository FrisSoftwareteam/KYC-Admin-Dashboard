import { useRecoilState } from 'recoil';
import { PartnerFilterState } from '../store/partner/filter';
import { useGetAllPartnersApi } from '../api/partner/get-all-partners';
import { useDisclosure } from '@chakra-ui/react';
import { TabProps } from '../components/partner/Tabs';
import { useState } from 'react';
import { useDisablePartnerApi } from '../api/partner/disable-partner';
import { useParams } from 'react-router-dom';
import { useGetPartnerByIdApi } from '../api/partner/get-partner-by-id';
import { useGetSinglePartnerVerificationsApi } from '../api/partner/get-partner-verifications';
import { useRestorePartnerApi } from '../api/partner/restore-partner';

export const usePartnersHook = () => {
  const { id } = useParams();
  const [filter, setFilter] = useRecoilState(PartnerFilterState);
  const { data, isLoading } = useGetAllPartnersApi();
  //   const { data: GPMapi, isLoading: GPMloading } = useGetPartnerMetricsApi();
  const isPending = filter.status === 'accepted' || filter.status === 'created';
  const disableDisclosure = useDisclosure();
  const inactiveDisclosure = useDisclosure();
  const feeDisclosure = useDisclosure();
  const acessDisclosure = useDisclosure();
  const { mutateAsync: disableMutate, isLoading: disableIsLoading } =
    useDisablePartnerApi();
  const { mutateAsync: restoreMutate, isLoading: restoreIsLoading } =
    useRestorePartnerApi();
  const {
    data: partner,
    isLoading: PLoading,
    refetch,
  } = useGetPartnerByIdApi(id as string, { enabled: Boolean(id) });
  const { data: partnerVerifications, isLoading: PVLoading } =
    useGetSinglePartnerVerificationsApi(id as string, { enabled: Boolean(id) });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleSubmit = async () => {
    partner?.data?.active
      ? await disableMutate(id as string)
      : await restoreMutate(id as string);
    await refetch();
    disableDisclosure.onClose();
  };

  const tabs: TabProps[] = [
    {
      label: 'Verifications',
      isActive: filter.name === 'verifications',
      onClick: () => setFilter({ ...filter, name: 'verifications', page: 1 }),
    },
    {
      label: 'Agents',
      isActive: filter.name === 'agents',
      onClick: () => setFilter({ ...filter, name: 'agents', page: 1 }),
    },
  ];

  return {
    filter,
    data,
    partner,
    partnerVerifications,
    PVLoading,
    PLoading,
    tabs,
    isLoading: isLoading,
    isPending,
    disableDisclosure,
    inactiveDisclosure,
    feeDisclosure,
    acessDisclosure,
    setFilter,
    pagination,
    setPagination,
    handleSubmit,
    isSubmiting: disableIsLoading || restoreIsLoading,
  };
};
