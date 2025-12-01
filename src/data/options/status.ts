export const statusTypes = [
  { label: 'Verified', value: 'verified' },
  { label: 'Not verified', value: 'failed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Created', value: 'created' },
  { label: 'Rejected', value: 'rejected' },
];
export const StatusTypeOptions = statusTypes;

export const addressStatusOptions = [
  ...statusTypes,
  {
    label: 'Pending Review',
    value: 'pending-review',
  },
  {
    label: 'Reviewed',
    value: 'reviewed',
  },
];

export const tatOptions = [
  {
    label: '24hrs',
    value: 24,
  },
  {
    label: '48hrs',
    value: 48,
  },
  {
    label: '72hrs',
    value: 72,
  },
  {
    label: 'More',
    value: 0,
  },
];
