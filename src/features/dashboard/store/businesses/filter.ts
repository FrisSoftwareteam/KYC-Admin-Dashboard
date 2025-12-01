import { atom } from 'recoil';

export interface BusinessFilter {
  size: number;
  page: number;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
}

export const BusinessFilterState = atom<BusinessFilter>({
  key: 'BusinessFilterState',
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
