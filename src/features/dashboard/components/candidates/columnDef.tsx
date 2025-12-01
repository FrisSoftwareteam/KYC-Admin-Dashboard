import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import { ICandidate } from '@/shared/interface/verification';
import { formatDate } from '@/utils/date-formater';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper<ICandidate>();

export const columnDef = [
  columnHelper.display({
    header: `Candidate's name`,
    id: 'name',
    cell: (props) => (
      <Link to={'/candidates/' + props.row.original._id}>
        <Box textTransform={'capitalize'}>
          {props.row.original.name?.toLowerCase()}
        </Box>
      </Link>
    ),
  }),
  // columnHelper.accessor('name', {
  //   cell: (info) => <Box>{info.getValue()}</Box>,
  //   header: `Candidate's name`,
  //   id: `name`,
  // }),
  columnHelper.accessor('email', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'email',
    id: 'email',
  }),
  columnHelper.accessor('phoneNumber', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Phone number',
    id: 'phoneNumber',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info.getValue() as string)}</Box>,
    header: 'Date added',
    id: 'createdAt',
  }),
];
