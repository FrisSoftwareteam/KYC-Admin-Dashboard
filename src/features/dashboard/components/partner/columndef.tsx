import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IPartner } from '@/shared/interface/partner';

const columnHelper = createColumnHelper<IPartner>();

export const columnDef = [
  columnHelper.display({
    header: 'PARTNER NAME',
    id: 'name',
    cell: (props) => (
      <Link to={'/partner/' + props.row.original._id}>
        <Box textTransform={'capitalize'}>
          {props.row.original.name?.toLowerCase()}
        </Box>
      </Link>
    ),
  }),
  columnHelper.accessor('address', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'ADDRESS',
    id: 'address',
  }),
  columnHelper.accessor('country.name', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info.getValue()?.toLowerCase()}</Box>
    ),
    header: 'Country',
    id: 'country',
  }),
];
