import { createColumnHelper } from '@tanstack/react-table';
import { Box, Center } from '@chakra-ui/react';
import { IVerification } from '@/shared/interface/verification';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';
import { Link } from 'react-router-dom';
import { formatNumber } from '@/utils/add-comma';

const columnHelper = createColumnHelper<IVerification>();

export const columnDef = [
  columnHelper.display({
    header: 'Candidate',
    id: 'name',
    cell: (props) => (
      <Link to={'/verifications/' + props.row.original._id}>
        <Box textTransform={'capitalize'}>
          {props.row.original.name?.toLowerCase()}
        </Box>
      </Link>
    ),
  }),
  columnHelper.accessor('date', {
    cell: (info) => <Box>{formatDate(info.getValue())}</Box>,
    header: 'Verification Date',
    id: 'verification-date',
  }),
  columnHelper.accessor('type', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info.getValue()?.toLowerCase()}</Box>
    ),
    header: 'Verification Type',
    id: 'verification-type',
  }),
  columnHelper.accessor('cost', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>₦{formatNumber(info.getValue())}</Box>
    ),
    header: 'Price',
    id: 'price',
  }),
  columnHelper.accessor('status', {
    cell: (info) => (
      <Center>
        <Status maxW={'10rem'} px={'1rem'} name={info.getValue()} />
      </Center>
    ),
    header: () => <Center>Status</Center>,
    id: 'status',
  }),
];
