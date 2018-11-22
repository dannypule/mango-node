import * as yup from 'yup';

export const UserYupSchema = yup.object().shape({
  firstName: yup.string().required('A first name is required.'),
  lastName: yup.string().required('A last name is required.'),
  email: yup
    .string()
    .email('A valid email is required.')
    .required('An email is required.'),
  password: yup.string().required('A password is required.'),
  companyUuid: yup.string(),
  userRoleCode: yup.string(),
});

export const validateUser = async (req, res, user) => {
  return UserYupSchema.validate(user);
};
