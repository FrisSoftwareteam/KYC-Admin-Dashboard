import { atom } from 'recoil';

export interface SinglePartnerFilter {
  size: number;
  page: number;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
}

export const SinglePartnerFilterState = atom<SinglePartnerFilter>({
  key: 'SinglePartnerFilterState',
  default: {
    size: 10,
    page: 1,
    type: '',
    name: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
  },
});
