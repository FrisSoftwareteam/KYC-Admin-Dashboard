export interface IBusiness {
  _id: string;
  active: boolean;
  name: string;
  email: string;
  address: string;
  industry: string;
  cacNumber: string;
  directorBvn: string;
  country: {
    code: string;
    name: string;
  };
  mainUser: {
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
  };
  createdAt: string;
}
