import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { IAgentVerification } from '@/shared/interface/agent';
import { AgentVerificationFilterState } from '@/features/dashboard/store/agentverification/filter';
import { useGetAgentVerificationApi } from '@/features/dashboard/api/agent/get-agent-verifications';

type ids = {
  partnerId: string;
  agentId: string;
};

export const useAgentVerificationHook = () => {
  const { partnerId, agentId } = useParams();
  const [filter, setFilter] = useRecoilState(AgentVerificationFilterState);
  const ids: ids = { partnerId: String(partnerId), agentId: String(agentId) };
  const { data: GAVapi, isLoading: GAVloading } = useGetAgentVerificationApi(
    ids,
    {
      enabled: Boolean(partnerId),
    }
  );

  const arrayData: Array<Partial<IAgentVerification>> | undefined =
    GAVapi?.data?.addresses?.map((item) => ({
      status: item?.status,
      _id: item?._id,
      createdAt: item?.createdAt,
      cost: item?.cost,
      category: item?.category,
      candidate: item.candidate,
    }));

  return {
    filter,
    setFilter,
    data: GAVapi,
    isLoading: GAVloading,
    arrayData,
  };
};
