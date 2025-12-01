export interface IAddress {
  street: string;
  lga: string;
  landmark: string;
  state: string;
  country: string;
  buildingNumber: string;
}
export interface ICreateverification {
  existingCandidate: boolean;
  chargeType: string;
  card?: string;
  countryCode: string;
  candidateConsentRequired?: boolean;
  verifications: {
    identity: {
      idNumber: string;
      type: string;
      dateOfBirth: string;
    };
    address: IAddress;
  };
  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    imageUrl: string;
  };
}
