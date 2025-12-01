import { atom } from 'recoil';

import implementPersist from '@/utils/implement-persist';
import { IUser } from '@/shared/interface/user';

export const UserState = atom<Partial<IUser>>({
  key: 'UserState',
  default: {
    id: '',
    businessId: '',
  },
  effects_UNSTABLE: implementPersist('UserState'),
});
