export const getColor = (name: string): string => {
  switch (name?.toLowerCase()) {
    case 'pending':
    case 'created':
    case 'suspended':
    case 'inactive':
    case 'review':
      return '#F5A623';
    case 'verified':
    case 'completed':
    case 'successful':
    case 'approved':
    case 'active':
      return '#00AF94';
    case 'failed':
    case 'flagged':
    case 'rejected':
    case 'declined':
      return '#D0021B';
    case 'initiated':
      return '#F5A623';
    case 'inprogress':
    case 'accepted':
      return '#FFA07A';
    default:
      return 'transparent';
  }
};
export const getVerificationAccordionColor = (name: string): string => {
  switch (name?.toLowerCase()) {
    case 'pending':
    case 'created':
      return 'rgba(245, 166, 35, 0.2)';
    case 'verified':
    case 'completed':
      return 'rgba(0, 175, 148, 0.2)';
    case 'failed':
      return '#D0021B';
    case 'initiated':
      return '#F5A623';
    case 'inprogress':
    case 'accepted':
      return '#FFA07A';
    default:
      return 'transparent';
  }
};
