import { atom } from 'recoil';

export interface PartnerVerificationsFilter {
  size: number;
  page: number;
  status: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
  state: string;
}

export const PartnerVerificationsFilterState = atom<PartnerVerificationsFilter>(
  {
    key: 'PartnerVerificationsFilterState',
    default: {
      size: 10,
      page: 1,
      status: '',
      name: '',
      search: '',
      customStartDate: '',
      customEndDate: '',
      state: '',
    },
  }
);
