import { useRecoilState } from 'recoil';
import { ICandidate } from '@/shared/interface/verification';
import { CandidateFilterState } from '../store/candidates/filter';
import { useGetCandidatePaginateApi } from '../api/candidate/get-candidates-paginate';

export const useCandidatePaginateHook = () => {
  const [filter, setFilter] = useRecoilState(CandidateFilterState);
  const { data, isLoading } = useGetCandidatePaginateApi();

  const arrayData: Array<Partial<ICandidate>> | undefined =
    data?.data?.candidates?.map((item) => ({
      _id: item?._id,
      email: item?.email,
      phoneNumber: item?.phoneNumber,
      name: `${item?.firstName} ${item?.lastName}`,
      createdAt: item?.createdAt,
    }));

  return {
    filter,
    setFilter,
    data,
    isLoading,
    arrayData,
  };
};
