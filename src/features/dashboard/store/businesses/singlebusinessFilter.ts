import { atom } from 'recoil';

export interface BusinessFilter {
  size: number;
  page: number;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
  status: string;
}

export const SingleBusinessFilterState = atom<BusinessFilter>({
  key: 'SingleBusinessFilterState',
  default: {
    size: 10,
    page: 1,
    type: '',
    name: '',
    status: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
  },
});
