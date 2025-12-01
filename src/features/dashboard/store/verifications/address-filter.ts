import { atom } from 'recoil';

export interface AddressesFilter {
  size: number;
  page: number;
  status: string;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
  state: string;
  tat?: number;
}

export const AddressesFilterState = atom<AddressesFilter>({
  key: 'AddressesFilterState',
  default: {
    size: 10,
    page: 1,
    status: '',
    type: '',
    name: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
    state: '',
  },
});
