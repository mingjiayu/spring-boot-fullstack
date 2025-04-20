import CreateCustomerForm from "../shared/CreateCustomerForm";
import { Flex, Text, Heading, Stack, Image, Link, Box } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const Signup = () => {
    const { customer, extractToken, login } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (customer) {
        navigate("/dashboard");
      }
    }, [customer, navigate]);
  
    const handleRegistrationSuccess = async (res, customerData) => {
      try {
        // Try to extract token from registration response
        const token = extractToken(res);
        
        if (token) {
          // If token exists, store it and set customer in context
          localStorage.setItem("access token", token);
          
          // Force a reload to ensure auth context is updated
          window.location.href = "/dashboard";
        } else {
          // If no token in registration response, try automatic login
          successNotification(
            "Registration successful",
            "Logging you in automatically..."
          );
          
          // Auto-login with the same credentials
          const loginData = {
            username: customerData.email,
            password: customerData.password
          };
          
          try {
            await login(loginData);
            navigate("/dashboard");
          } catch (loginError) {
            console.error("Auto-login failed:", loginError);
            successNotification(
              "Registration successful",
              "Please log in with your credentials"
            );
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error during registration flow:", error);
        successNotification(
          "Registration successful",
          "Please log in with your credentials"
        );
        navigate("/");
      }
    };
  
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
              Register for an account
            </Heading>
            <CreateCustomerForm
              onSuccess={handleRegistrationSuccess}
            />
            <Link color={"blue.500"} href={"/"}>
              Have an account? Login now.
            </Link>
          </Stack>
        </Flex>
  
        {/* Video Side - keeping this part unchanged */}
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
            <Text
              fontSize="6xl"
              color="white"
              fontWeight="bold"
              textShadow="1px 1px 3px rgba(0,0,0,0.6)"
            >
              <Link href="https://www.linkedin.com/in/mingjiayu/" isExternal>
                LinkedIn
              </Link>
            </Text>
          </Flex>
        </Box>
      </Stack>
    );
  };
  
  export default Signup;
