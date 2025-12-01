export interface IVerification {
  date: string | any;
  name: string;
  type: string;
  status: string;
  cost?: any;
  _id: string;

  [x: string]: any;
  createdAt?: Date;
  candidate?: {
    firstName: string;
    lastName: string;
  };
  agent?: {
    firstName: string;
    lastName: string;
  };
}

export interface VerificationsBase {
  candidate: ICandidate;
  verificationType: 'identity' | 'address';
  status: string;
  paymentType?: string;
  cost?: number;
  createdAt: string;
  _id: string;
}

export interface ICandidate {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  imageUrl: string;
  dateOfBirth?: string;
  email?: string;
  createdAt?: string;
  name?: string;
}
export interface IAddressVerification {
  position: {
    latitude: string;
    longitude: string;
  };
  candidate: Partial<ICandidate>;

  formatAddress: string;
  details: any;
  status: string;
  notes: any;
  images: any;
  createdAt: string;
  _id: string;

  submissionLocation: any;
  category: string;

  agentReports: {
    gatePresent: boolean;
  };

  cost: 800;
  googleMapUrl: string;
  distanceBetweenLocation: any;
  addressGoogleMapUrl: string;
  timelines: any;

  accuracy: string;
}
export interface IIdentityVerification {
  idType: string;
  idNumber: string;
  status: string;
  validationData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    gender: string;
    nin: string;
    imageUrl: string;
    birthState: string;
    nextOfKinState: string;
    religion: string;
    birthLGA: string;
    birthCountry: string;
    country: string;
  };
}

interface IdentityVerificationResponse extends VerificationsBase {
  verificationType: 'identity';
  identity: IIdentityVerification;
}

interface AddressVerificationResponse extends VerificationsBase {
  verificationType: 'address';
  address: IAddressVerification;
}

export type VerificationsResponse =
  | IdentityVerificationResponse
  | AddressVerificationResponse;
