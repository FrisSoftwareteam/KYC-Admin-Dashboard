import { ICreateverification } from '../../types/verifications/create-verification';

export const createVerificationInitialvalues: ICreateverification = {
  existingCandidate: false,
  countryCode: 'NG',
  chargeType: '',
  verifications: {
    identity: {
      idNumber: '',
      type: 'nin',
      dateOfBirth: '',
    },
    address: {
      street: '',
      lga: '',
      landmark: '',
      state: '',
      country: 'Nigeria',
      buildingNumber: '',
    },
  },
  candidate: {
    firstName: '',
    lastName: '',
    middleName: '',
    imageUrl: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    _id: '',
  },
};
