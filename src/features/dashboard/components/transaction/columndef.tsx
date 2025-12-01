import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';
import { ITransaction } from '@/shared/interface/transaction';
import Status from '@/components/elements/status/Status';
import { formatDate } from '@/utils/date-formater';
import { formatNumber } from '@/utils/add-comma';

const columnHelper = createColumnHelper<ITransaction>();

export const columnDef = [
  columnHelper.accessor('name', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Candidate name',
    id: 'candidate-name',
  }),
  columnHelper.accessor('date', {
    cell: (info) => <Box>{formatDate(info.getValue() as string)}</Box>,
    header: 'Verification Date',
    id: 'verification-date',
  }),
  columnHelper.accessor('verificationType', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Verification Type',
    id: 'verification-type',
  }),
  columnHelper.accessor('amount', {
    cell: (info) => <Box>₦ {formatNumber(info.getValue())}</Box>,
    header: 'Pirce',
    id: 'price',
  }),
  columnHelper.accessor('initiatedBy', {
    cell: (info) => <Box>{info.getValue()}</Box>,
    header: 'Initiated by',
    id: 'initiatedby',
  }),
  columnHelper.accessor('status', {
    cell: (info) => <Status name={info.getValue()} />,
    header: 'Status',
    id: 'status',
  }),
];
