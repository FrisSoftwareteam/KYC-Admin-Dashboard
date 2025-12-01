import * as Yup from 'yup';
export const addCandidateValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  middleName: Yup.string().nullable(),
  phoneNumber: Yup.string().required('Phone number is required'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Date of birth must be a valid date'),
  email: Yup.string().email('Email must be a valid email address'),
  imageUrl: Yup.string().url('Image URL must be a valid URL').nullable(), // Allow imageUrl to be nullable if it's not required
});
