import { createColumnHelper } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { IVerification } from '@/shared/interface/verification';
import { formatDate } from '@/utils/date-formater';
import { formatNumber } from '@/utils/add-comma';
import Status from '@/components/elements/status/Status';

const columnHelper = createColumnHelper<IVerification>();

export const columnDef = [
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
  columnHelper.accessor('createdAt', {
    cell: (info) => <Box>{formatDate(info?.getValue() as any)}</Box>,
    header: 'Verification Date',
    id: 'verification-date',
  }),
  columnHelper.accessor('verificationType', {
    cell: (info) => (
      <Box textTransform={'capitalize'}>{info?.getValue()?.toLowerCase()}</Box>
    ),
    header: 'Verification Type',
    id: 'verification-type',
  }),
  columnHelper.accessor('cost', {
    cell: (info) => <Box>{`₦${formatNumber(info?.getValue())}`}</Box>,
    header: 'Price',
    id: 'price',
  }),

  columnHelper.accessor('status', {
    cell: (info) => <Status name={info?.getValue()} />,
    header: 'Status',
    id: 'status',
  }),
];
