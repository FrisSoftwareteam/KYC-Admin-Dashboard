import * as Yup from 'yup';

// Create Yup validation schema for CreateverificationRequest
export const createVerificationRequestSchema = Yup.object().shape({
  countryCode: Yup.string().required('Country code is required'),
  verifications: Yup.object().shape({
    identity: Yup.object()
      .shape({
        idNumber: Yup.string().min(
          1,
          'ID number must be at least 1 character long'
        ),
        type: Yup.string().min(
          1,
          'Identity type must be at least 1 character long'
        ), // Adjust as per your requirements
        dateOfBirth: Yup.date()
          .typeError('Date of birth must be a valid date')
          .nullable(),
      })
      .nullable(),
    address: Yup.object()
      .shape({
        street: Yup.string().min(1, 'Street must be at least 1 character long'), // Adjust as per your requirements
        lga: Yup.string().min(1, 'LGA must be at least 1 character long'), // Adjust as per your requirements
        landmark: Yup.string(),
        state: Yup.string().min(1, 'State must be at least 1 character long'), // Adjust as per your requirements
        country: Yup.string().min(
          1,
          'Country must be at least 1 character long'
        ), // Adjust as per your requirements
        buildingNumber: Yup.string(),
      })
      .nullable(),
  }),

  candidate: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    middleName: Yup.string().nullable(),
    phoneNumber: Yup.string().required('Phone number is required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of birth cannot be in the future')
      .typeError('Date of birth must be a valid date'),
    email: Yup.string().email('Email must be a valid email address'),
    imageUrl: Yup.string().url('Image URL must be a valid URL').nullable(),
  }),
});
