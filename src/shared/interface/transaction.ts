import { ICandidate } from './verification';

export interface ITransaction {
  date?: string | any;
  name?: string;
  type?: string;
  verificationType?: string;
  status?: string;
  price?: string;
  initiatedBy?: string;

  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: {
      countryCode: string;
      number: string;
    };
    userType: string;
    mustChangePassword: boolean;
    isEmailVerified: boolean;
  };
  task?: {
    candidate: ICandidate;
    verificationType: string;
  };
  amount: number;
  reference: string;
  createdAt: string;
  _id: string;
}
