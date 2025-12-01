import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import Status from '@/components/elements/status/Status';
// import moment from 'moment';
import RowActions from './RowActions';
import { formatNumber } from '@/utils/add-comma';

const columnHelper = createColumnHelper<{
  _id: string;
  name: string;
  slug: string;
  price: number;
  active: boolean;
}>();

export const columnDef = [
  columnHelper.display({
    cell: (props: any) => {
      return <Box>{`${props.row.original?.name}`}</Box>;
    },
    header: 'Name',
    id: 'name',
  }),
  columnHelper.accessor('price', {
    cell: (info) => (
      <Box px={'.5rem'}>{`₦${formatNumber(info?.getValue())}`}</Box>
    ),
    header: 'Price',
    id: 'price',
  }),
  // columnHelper.accessor('createdAt', {
  //   cell: (info) => <Box>{moment(info.getValue()).format('Do MMM YYY')}</Box>,
  //   header: 'Date',
  //   id: 'date-added',
  // }),
  columnHelper.accessor('active', {
    cell: (info) => {
      const status = info.row.original?.active === true ? 'active' : 'inactive';
      return <Status maxW={'6rem'} px={'1rem'} name={status} />;
    },
    header: 'Status',
    id: 'active',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <RowActions row={props.row} />,
  }),
];
