import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { saveCustomer } from "../../services/client";
import {
  successNotification,
  errorNotification,
} from "../../services/notification";

import { useAuth } from "../context/AuthContext";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input
        id={props.id || props.name} // Add this line to ensure id matches
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon /> {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select
        id={props.id || props.name} // Add this line to ensure id matches
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon /> {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

const CreateCustomerForm = ({ onSuccess }) => {
  const { extractToken } = useAuth(); // Get token extraction helper

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          age: "",
          gender: "",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          age: Yup.number()
            .min(16, "Must be at least 16 years of age")
            .max(100, "Must be less than 100 years of age")
            .required("Required"),
          password: Yup.string()
            .max(15, "Must be 15 characters or less")
            .min(4, "Must be 4 characters or more")
            .required("Required"),
          gender: Yup.string()
            .oneOf(["MALE", "FEMALE"], "Invalid gender")
            .required("Required"),
        })}
        // Update in CreateCustomerForm.jsx - modify the onSubmit function
        onSubmit={(customer, { setSubmitting }) => {
          setSubmitting(true);
          saveCustomer(customer)
            .then((res) => {
              console.log("Full registration response:", res);
              console.log("Registration response data:", res.data);
              console.log("Registration response headers:", res.headers);

              successNotification(
                "Customer saved",
                `${customer.name} was successfully saved`
              );

              // Pass both the full response and the customer data
              onSuccess(res, customer);
            })
            .catch((err) => {
              console.log(err);
              errorNotification(err.code, err.response.data.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <Stack spacing={"24px"}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane"
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />

              <MyTextInput
                label="Age"
                name="age"
                type="number"
                placeholder="20"
              />

              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="pick a secure password"
              />

              <MySelect label="Gender" name="gender">
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </MySelect>

              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCustomerForm;
