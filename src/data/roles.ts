import { IRole } from '@/shared/interface/role';
import { faker } from '@faker-js/faker';

export const ROLES: IRole[] = [];

export function createRandomRoles(): IRole {
  return {
    name: faker.helpers.arrayElement(['Administrator', 'User', 'New Role']),
    date: faker.date.recent(),
    users: faker.helpers.arrayElement(['4', '500', '20']),
    _id: faker.database.mongodbObjectId(),
    permissions: ['Administrator', 'User', 'New Role'],
  };
}

Array.from({ length: 5 }).forEach(() => {
  ROLES.push(createRandomRoles());
});

export const roleData = {
  data: { roles: ROLES },
};
