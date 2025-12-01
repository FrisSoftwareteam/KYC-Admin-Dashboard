import { atom } from 'recoil';

export interface PartnerFilter {
  size: number;
  page: number;
  status: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
}

export const PartnerFilterState = atom<PartnerFilter>({
  key: 'PartnerFilterState',
  default: {
    size: 10,
    page: 1,
    status: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
    name: 'verifications',
  },
});
