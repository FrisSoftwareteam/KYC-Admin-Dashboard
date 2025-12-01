export interface IUser {
  id: string;
  businessId: string;
  name: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  userType: string;
  status: string;
  mustChangePassword: boolean;
  isEmailVerified: boolean;
}

export interface BusinessUser extends IUser {
  role: string;
  lastLogin: string;
}

export interface IUserProfile {
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
}
