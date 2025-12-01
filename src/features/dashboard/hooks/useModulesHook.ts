import { useRecoilState } from 'recoil';
import { ModulesFilterState } from '../store/modules/filter';
import { TabProps } from '../components/other-modules/Tabs';
import { useGetOtherModulesApi } from '../api/modules/get-other-verifications';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useGetAllUsersApi } from '../api/users/get-all-users';
import { useToast } from '@/hooks/useToast';
import { useSendEmailApi } from '../api/modules/send-email';
import { useApproveOtherVerificationApi } from '../api/modules/approve-verification';

export const useModulesHook = () => {
  const toast = useToast();
  const viewDisclosure = useDisclosure();
  const [filter, setFilter] = useRecoilState(ModulesFilterState);
  const { mutateAsync, isLoading: SEisLoading } = useSendEmailApi();
  const { mutateAsync: AVMutateAsync, isLoading: AVisLoading } =
    useApproveOtherVerificationApi();
  const { data, isLoading, refetch } = useGetOtherModulesApi();
  const { data: GAUapi } = useGetAllUsersApi({
    roleName: 'Verifier',
  });
  const isPending = filter.status === 'accepted' || filter.status === 'created';
  const [viewData, setViewData] = useState<any>();
  const [verifier, setVerifier] = useState('');

  const tabs: TabProps[] = [
    {
      label: 'Academics Verification',
      isActive: filter.type === 'academicDocuments',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'academicDocuments',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Projects Verification',
      isActive: filter.type === 'projectVerification',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'projectVerification',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Document Partnership',
      isActive: filter.type === 'documents',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'documents',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Business Partnership',
      isActive: filter.type === 'businessPartnership',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'businessPartnership',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Guarantor Verification',
      isActive: filter.type === 'guarantorVerification',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'guarantorVerification',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Employment Verification',
      isActive: filter.type === 'employmentVerification',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'employmentVerification',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Tenancy and Landlord Partnership',
      isActive: filter.type === 'tenancy',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'tenancy',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Household Verification',
      isActive: filter.type === 'household',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'household',
          status: 'created',
          page: 1,
        }),
    },
    {
      label: 'Business Verification',
      isActive: filter.type === 'businessVerification',
      onClick: () =>
        setFilter({
          ...filter,
          type: 'businessVerification',
          status: 'created',
          page: 1,
        }),
    },
  ];

  const headertabs: TabProps[] = [
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

  const sendEmail = async () => {
    if (!verifier) {
      return toast({ description: 'No verifier Id', status: 'error' });
    }
    await mutateAsync({
      verificationId: viewData?._id,
      verifier: verifier,
    });
    await refetch();
  };

  const handleApprove = async () => {
    await AVMutateAsync({
      verificationId: viewData?._id,
      approved: true,
    });
    await refetch();
    viewDisclosure.onClose();
  };

  return {
    tabs,
    headertabs,
    data,
    isLoading,
    filter,
    viewDisclosure,
    GAUapi,
    viewData,
    verifier,
    SEisLoading,
    AVisLoading,
    setViewData,
    setVerifier,
    sendEmail,
    handleApprove,
  };
};

export type TuseModulesHook = ReturnType<typeof useModulesHook>;
