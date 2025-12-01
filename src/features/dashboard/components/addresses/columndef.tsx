import { createColumnHelper } from '@tanstack/react-table';
import { Box, Checkbox, Flex } from '@chakra-ui/react';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';
import { IAgentVerification } from '@/shared/interface/agent';
import { Link } from 'react-router-dom';
import { FaFlag } from 'react-icons/fa6';
import Action from './Action';
import { getColor } from '@/utils/get-color';
const columnHelper = createColumnHelper<IAgentVerification>();

export const columnDef = [
  {
    id: 'select',
    header: ({ table }: any) => (
      <Checkbox
        colorScheme="primary"
        size={'sm'}
        isChecked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }: any) => (
      <div className="px-1">
        <Checkbox
          colorScheme="primary"
          size={'sm'}
          isChecked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
  columnHelper.display({
    cell: (props) => {
      return (
        <Link to={'/addresses/' + props.row.original._id}>
          <Box>{`${props.row.original?.candidate?.firstName}
         ${props.row.original?.candidate?.lastName}`}</Box>
        </Link>
      );
    },
    header: `Candidate's name`,
    id: 'candidate-name',
  }),

  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info?.getValue())}</Box>,
    header: 'Date assigned',
    id: 'date-assigned',
  }),
  columnHelper.display({
    cell: (props) => {
      const status = props.row.original?.approver?.status;

      return (
        <Box color={getColor(status)} textTransform="uppercase">
          {status}
        </Box>
      );
    },
    header: 'Approval Level',
    id: 'approval-level',
  }),
  columnHelper.display({
    cell: (info) => (
      <Flex position={'relative'} gap={'.5rem'} alignItems={'center'}>
        <Box minW={'5rem'}>
          <Status name={info.row.original.status} />
        </Box>
        {info.row.original.isFlagged && <FaFlag color="pink" />}
      </Flex>
    ),
    header: 'Status',
    id: 'status',
  }),
  columnHelper.display({
    cell: (info) => <Action data={info.row.original} />,
    header: 'Action',
    id: 'action',
  }),
];
