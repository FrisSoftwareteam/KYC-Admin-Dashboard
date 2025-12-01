import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import RowActions from './RowActions';
import Status from '@/components/elements/status/Status';
import moment from 'moment';

const columnHelper = createColumnHelper();

export const columnDef = [
  columnHelper.display({
    cell: (props: any) => {
      return (
        <Box>{`${props.row.original?.firstName} ${props.row.original?.lastName}`}</Box>
      );
    },
    header: 'Admin name',
    id: 'admin-name',
  }),
  columnHelper.accessor('email', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Email',
    id: 'email',
  }),
  columnHelper.accessor('role.name', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Role',
    id: 'role',
  }),
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{moment(info.getValue()).format('Do MMM YYY')}</Box>,
    header: 'Date added',
    id: 'date-added',
  }),
  columnHelper.accessor('status', {
    cell: (info) => (
      <Status maxW={'10rem'} px={'1rem'} name={info.getValue() as string} />
    ),
    header: 'Status',
    id: 'status',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions row={props.row} />,
  }),
];
