export interface IPartner {
  _id: string;
  name: string;
  address: string;
  phoneNumber?: {
    countryCode: string;
    number: string;
  };
  active: boolean;
  prices: {
    address: {
      agent: {
        [key: string]: number;
      };
      partner: {
        [key: string]: number;
      };
    };
  };
  country: {
    code: string;
    name: string;
  };
  states: Array<string>;
  settings: {
    'can-manage-task': boolean;
    'can-reassign-task': boolean;
    'can-manage-agents': boolean;
    'can-view-agents-task': boolean;
    'can-view-agents-location': boolean;
    'can-view-agents-activities': boolean;
    'can-view-agents-payment-activities': boolean;
  };
}
