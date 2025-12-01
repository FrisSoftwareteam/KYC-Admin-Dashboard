import { createColumnHelper } from '@tanstack/react-table';
import { Box, Flex } from '@chakra-ui/react';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';
import { IAgentVerification } from '@/shared/interface/agent';
import { Link } from 'react-router-dom';
import { FaFlag } from 'react-icons/fa6';

const columnHelper = createColumnHelper<IAgentVerification>();

export const unAssignedcolumnDef = [
  columnHelper.display({
    cell: (props) => {
      return (
        <Link to={'/verifications/' + props.row.original._id}>
          <Box>{`${props.row.original?.candidate?.firstName}
         ${props.row.original?.candidate?.lastName}`}</Box>
        </Link>
      );
    },
    header: `Candidate's name`,
    id: 'candidate-name',
  }),
  columnHelper.accessor('verificationType', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info.getValue()?.toLowerCase()}</Box>
    ),
    header: 'Verification Type',
    id: 'verification-type',
  }),

  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info?.getValue())}</Box>,
    header: 'Date assigned',
    id: 'date-assigned',
  }),
  columnHelper.accessor('status', {
    cell: (info) => <Status name={info?.getValue()} />,
    header: 'Status',
    id: 'status',
  }),
];

export const assignedcolumnDef = [
  columnHelper.display({
    cell: (props) => {
      return (
        <Link to={'/verifications/' + props.row.original._id}>
          <Box>{`${props.row.original?.candidate?.firstName}
         ${props.row.original?.candidate?.lastName}`}</Box>
        </Link>
      );
    },
    header: `Candidate's name`,
    id: 'candidate-name',
  }),
  columnHelper.accessor('verificationType', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info?.getValue()?.toLowerCase()}</Box>
    ),
    header: 'Verification Type',
    id: 'verification-type',
  }),

  // columnHelper.display({
  //   cell: (props) => {
  //     return (
  //       <Box>{`${props.row.original?.agent?.user?.firstName}
  //        ${props.row.original?.agent?.user?.lastName}`}</Box>
  //     );
  //   },
  //   header: `Agent`,
  //   id: 'agent',
  // }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info?.getValue())}</Box>,
    header: 'Date assigned',
    id: 'date-assigned',
  }),
  columnHelper.display({
    cell: (info) => (
      <Flex position={'relative'} gap={'.5rem'} alignItems={'center'}>
        <Box minW={'5rem'}>
          <Status name={info.row.original.status} />
        </Box>
        {info.row.original.address?.isFlagged && <FaFlag color="red" />}
      </Flex>
    ),
    header: 'Status',
    id: 'status',
  }),
];
