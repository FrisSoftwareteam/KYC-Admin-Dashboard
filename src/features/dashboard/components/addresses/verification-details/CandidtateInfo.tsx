import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ReassignAgent } from './ReassignAgent';
import { IAgentVerification } from '@/shared/interface/agent';
import moment from 'moment';
import VerificationInfo from './VerificationInfo';

export function CandidtateInfo(data: Partial<IAgentVerification>) {
  const { candidate, category, formatAddress, status, agent, approver } = data;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const viewVerification = useDisclosure();
  const agentAssigned =
    status === 'failed' || (status === 'verified' && Boolean(agent));
  const canReplace =
    Boolean(agent) && status !== 'failed' && status !== 'verified';
  const canAssignOrReplace = approver?.status === 'review';

  return (
    <Box>
      <Text fontSize={'20px'} fontWeight={700}>
        Candidate Info
      </Text>
      <VStack w={'full'} mt={'24px'} gap={'18px'}>
        <NameAndValue
          name={'Candidate’s name'}
          value={`
        ${candidate?.firstName?.toLowerCase()}
         ${candidate?.lastName?.toLowerCase()}`}
        />
        <NameAndValue name={'Verification type'} value={category} />
        <NameAndValue name={'Address'} value={formatAddress} />
        <NameAndValue name={'Phone number'} value={candidate?.phoneNumber} />
        {/* <NameAndValue name={'Date'} value={'7th, Aug 2027'} /> */}
      </VStack>

      <Divider my={'40px'} />

      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'} fontWeight={700}>
          Agent Info
        </Text>
        {canAssignOrReplace && !agentAssigned && (
          <Button
            variant={'ghost'}
            borderColor={'#4F4F4F'}
            borderWidth={'1px'}
            color={'#4F4F4F'}
            fontSize={'13px'}
            fontWeight={500}
            _hover={{ bg: 'transparent' }}
            onClick={onOpen}
          >
            {canReplace ? 'Replace' : 'Assign'} agent
          </Button>
        )}
      </HStack>

      {agent && (
        <VStack w={'full'} mt={'24px'} gap={'18px'}>
          <NameAndValue
            name={'Name'}
            value={`
        ${agent?.user?.firstName?.toLowerCase()}
         ${agent?.user?.lastName?.toLowerCase()}`}
          />
          <NameAndValue
            name={'Phone number'}
            value={`
        ${agent?.user?.phoneNumber?.countryCode}
         ${agent?.user?.phoneNumber?.number}`}
          />
          <NameAndValue name={'Email Address'} value={agent?.user?.email} />
        </VStack>
      )}
      <Divider my={'40px'} />

      <HStack
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'} fontWeight={700}>
          Verification Info{' '}
        </Text>
      </HStack>

      <VStack w={'full'} mt={'24px'} gap={'18px'}>
        <NameAndValue
          name={'Created time'}
          value={moment(data?.createdAt).format('MMM D, YYYY h:mm a')}
        />
        {data?.timelines?.completedAt && (
          <NameAndValue
            name={'Completed time'}
            value={moment(data?.timelines?.completedAt).format(
              'MMM D, YYYY h:mm a'
            )}
          />
        )}
        <HStack
          w={'full'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Text
            whiteSpace={'nowrap'}
            color={'#4F4F4F'}
            fontWeight={400}
            fontSize={'14px'}
            w={'full'}
          >
            {'Information submitted'}
          </Text>

          {/* <Link
            textDecor={'none !important'}
            w={'full'}
            as={RouterLink}
            to={`/verifications/${data.task}`}
          > */}
          <Text
            textAlign={'right'}
            fontWeight={500}
            fontSize={'14px'}
            color={'#5B8BFF'}
            cursor={'pointer'}
            onClick={viewVerification.onOpen}
            textDecor={'none !important'}
            whiteSpace={'nowrap'}
          >
            {'View details'}
          </Text>
          {/* </Link> */}
        </HStack>
      </VStack>

      <ReassignAgent isOpen={isOpen} onClose={onClose} />
      <VerificationInfo
        data={data}
        isOpen={viewVerification.isOpen}
        onClose={viewVerification.onClose}
      />
    </Box>
  );
}

function NameAndValue({ name, value }) {
  return (
    <HStack
      w={'full'}
      justifyContent={'space-between'}
      alignItems={'flex-start'}
    >
      <Text color={'#4F4F4F'} fontWeight={400} fontSize={'14px'} w={'full'}>
        {name}
      </Text>
      <Text
        textAlign={'right'}
        lineHeight={'20px'}
        fontWeight={500}
        fontSize={'14px'}
        color={'#333333'}
        w={'full'}
        textTransform={'capitalize'}
        whiteSpace={'nowrap'}
      >
        {value}
      </Text>
    </HStack>
  );
}
