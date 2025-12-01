import { atom } from 'recoil';

export interface ModulesFilter {
  size: number;
  page: number;
  status: string;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
}

export const ModulesFilterState = atom<ModulesFilter>({
  key: 'modulesFilterState',
  default: {
    size: 10,
    page: 1,
    status: 'created',
    type: 'academicDocuments',
    name: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
  },
});
