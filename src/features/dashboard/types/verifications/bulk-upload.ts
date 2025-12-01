import { ICandidate } from '@/shared/interface/verification';
import { IAddress } from './create-verification';

export interface IdentitybulkUpload extends ICandidate {
  middleName: string;
  identityNumber: string;
  identityType: string;
}

export interface IAddressBulkUpload extends IAddress {
  addressBuildingNumber: string;
  addressBuildingName: string;
  addressSubstreet: string;
  addressStreet: string;
  addressLga: string;
  addressLandmark: string;
  addressState: string;
  addressCountry: string;
  candidateFirstName: string;
  candidateMiddleName: string;
  candidateLastName: string;
  candidateEmail: string;
  candidatePhoneNumber: string;
  candidateDateOfBirth: string;
}
