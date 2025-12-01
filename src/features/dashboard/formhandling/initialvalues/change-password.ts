export interface IPasswordChangeForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export const changepasswordInitialValues: IPasswordChangeForm = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};
