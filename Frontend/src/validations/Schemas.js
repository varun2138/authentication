import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string()
    .min(6, "min 6 characters are required")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("confirm password is required"),
  fullName: Yup.string().required("fullName is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("email is required"),
  password: Yup.string()
    .min(6, "min of 6 characters are required")
    .required("password is required"),
});
export { loginSchema, signUpSchema };
