"use client";

import {
  Flex,
  Text,
  Heading,
  Stack,
  Image,
  Link,
  Button,
  Box,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import { useAuth } from "../context/AuthContext";
import { errorNotification } from "../../services/notification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input 
        id={props.id || props.name}  // Add this line to ensure id matches
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

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <Formik
      validationOnMount={true}
      validationSchema={Yup.object({
        username: Yup.string()
          .email("Must be valid email")
          .required("Email is required"),
        password: Yup.string()
          .max(20, "Password cannot be more than 20 characters")
          .required("Password is required"),
      })}
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        login(values)
          .then((res) => {
            navigate("/dashboard");
            console.log("Successfully logged in", res);
          })
          .catch((err) => {
            errorNotification(err.code, err.response.data.message);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form>
          <Stack spacing={15}>
            <MyTextInput
              label={"Email"}
              name={"username"}
              type={"email"}
              placeholder={"example@gmail.com"}
            />
            <MyTextInput
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"type your password"}
            />
            <Button type={"submit"} disabled={!isValid || isSubmitting}>
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (customer) {
      navigate("/dashboard");
    }
  }, [customer, navigate]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image
            src={
              "https://png.pngtree.com/png-vector/20220701/ourmid/pngtree-gecko-logo-vector-icon-illustration-template-png-image_5459189.png"
            }
            boxSize={"200px"}
            alt={"Ivy Logo"}
          />
          <Heading fontSize={"2xl"} mb={15}>
            Sign in to your account
          </Heading>
          <LoginForm />
          <Link color={"blue.500"} href={"/signup"}>
            Don't have an account? Sign up now.
          </Link>
        </Stack>
      </Flex>
      
      {/* Video Side */}
      <Box 
        flex={1} 
        bg="black" 
        position="relative"
        display={{ base: "none", md: "block" }}
      >
        <Box
          as="video"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        
        <Flex
          position="absolute"
          bottom="5%"
          width="100%"
          justifyContent="center"
          zIndex={1}
        >
          <Text fontSize="6xl" color="white" fontWeight="bold" textShadow="1px 1px 3px rgba(0,0,0,0.6)">
            <Link href="https://www.linkedin.com/in/mingjiayu/" isExternal>
              LinkedIn
            </Link>
          </Text>
        </Flex>
      </Box>
    </Stack>
  );
};

export default Login;
