import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { IBusiness } from '@/shared/interface/business';

const columnHelper = createColumnHelper<IBusiness>();

export const columnDef = [
  columnHelper.display({
    header: 'BUSINESS NAME',
    id: 'name',
    cell: (props) => (
      <Link to={'/business/' + props.row.original._id}>
        <Box textTransform={'capitalize'}>
          {props.row.original.name?.toLowerCase()}
        </Box>
      </Link>
    ),
  }),
  columnHelper.accessor('email', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'EMAIL ADDRESS',
    id: 'verification-email',
  }),
  columnHelper.accessor('address', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'ADDRESS',
    id: 'address',
  }),

  // columnHelper.accessor('cr', {
  //   cell: (info) => <Box>{formatDate(info.getValue())}</Box>,
  //   header: 'EMAIL ADDRESS',
  //   id: 'verification-email',
  // }),
];
