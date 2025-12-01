import React from 'react';
import Top from './Top';
import { Link, useParams } from 'react-router-dom';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { Flex, Text } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AgentMetrics from './AgentMetrics';
import Bottom from './Bottom';
import { useGetAgentByIdApi } from '@/features/dashboard/api/agent/get-agent-by-id';

export function AgentById() {
  const { partnerId, agentId } = useParams();
  const { data: GAapi, isLoading: GAloading } = useGetAgentByIdApi(
    { partnerId: String(partnerId), agentId: String(agentId) },
    { enabled: Boolean(agentId) }
  );

  if (GAloading) {
    return <LogoLoader />;
  }
  return (
    <div>
      <Top {...GAapi?.data} />
      <Link to={`/partner/${partnerId}`}>
        <Flex pl={'1.5rem'} my={'1.6rem'} gap={'.2rem'} alignItems={'center'}>
          <IoIosArrowRoundBack fontSize={'1.7rem'} />
          <Text fontFamily={'heading'}>Back to agents</Text>
        </Flex>
      </Link>
      <AgentMetrics {...GAapi?.data} />
      <Bottom />
    </div>
  );
}
