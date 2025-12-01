import { atom } from 'recoil';
import { IUser } from '@/shared/interface/user';

export const UserState = atom<Partial<IUser>>({
  key: 'verifierState',
  default: {
    id: '',
    businessId: '',
  },
});
