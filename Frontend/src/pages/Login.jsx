import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  Image,
  Icon,
  Alert,
  AlertIcon,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { FaUserShield, FaUserGraduate, FaUserFriends } from "react-icons/fa";
import LoginImage from "../assets/images/Login/log.svg";
import RegisterImage from "../assets/images/Login/register.svg";

const RoleButton = ({ role, currentRole, onClick, ariaLabel }) => (
  <Button
    variant="link"
    onClick={() => onClick(role)}
    isActive={currentRole === role}
    aria-label={ariaLabel}
  >
    {role.charAt(0).toUpperCase() + role.slice(1)}
  </Button>
);

const FormError = ({ error }) => (
  error ? (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  ) : null
);

export default function LoginPage() {
  const navigate = useNavigate(); // Hook for navigation
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("affiliate"); // Track the role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`${role} login`, formData);
    // Implement actual login logic
  };

  
  const handleSignUp = (e) => {
    e.preventDefault();

    

    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    console.log("Student sign-up", formData);
    // Implement actual sign-up logic
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign-up");
    // Implement Google sign-up logic
  };

  const toggleSignUp = () => {
    if (role === "affiliate") {
      navigate("/affiliate-form"); // Navigate to affiliate form
      return;
    }
    setIsSignUp(!isSignUp);
    setError("");
  };

  const toggleRole = (role) => {
    setRole(role);
    setIsSignUp(false);
    setError("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      mt={"50"}
    >
      <Flex
        w="full"
        maxW="1200px"
        mx="auto"
        direction={{ base: "column", md: "row" }}
      >
        {isSignUp && role === "student" ? (
          <>
            <Box
              flex="1"
              p={8}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack spacing={4} textAlign="center">
                <Flex justify="center" mb={4}>
                  <Icon
                    as={FaUserGraduate}
                    boxSize={10}
                    color={useColorModeValue("blue.400", "blue.300")}
                    zIndex="docked" // Ensure the icon is above other elements
                  />
                </Flex>
                <Heading fontSize={"4xl"} mb={4}>
                  Student Sign Up
                </Heading>
                <Image
                  src={RegisterImage}
                  alt="Register illustration showing a person signing up"
                  objectFit="cover"
                />
              </Stack>
            </Box>
            <Box flex="1" p={8}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                <Stack align={"center"} spacing={4}>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Create an account to get started!
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      isRequired
                    />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      isRequired
                    />
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      isRequired
                    />
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      isRequired
                    />
                    <FormError error={error} />
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                    <Button variant="outline" onClick={handleGoogleSignUp}>
                      Sign Up with Google
                    </Button>
                    <Stack pt={6} spacing={4}>
                      <Text align={"center"}>
                        Already have an account?{" "}
                        <ChakraLink
                          color={"blue.400"}
                          onClick={toggleSignUp}
                          as="span"
                          cursor="pointer"
                        >
                          Sign In
                        </ChakraLink>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
                <Divider />
                <Stack
                  direction={"row"}
                  spacing={4}
                  justify={"center"}
                  mt={4}
                >
                  <RoleButton
                    role="admin"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Admin Role"
                  />
                  <RoleButton
                    role="student"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Student Role"
                  />
                  <RoleButton
                    role="affiliate"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Affiliate Role"
                  />
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <>
            <Box flex="1" p={10}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                <Stack align={"center"} spacing={4}>
                  <Flex justify="center" mb={4}>
                    <Icon
                      as={
                        role === "affiliate"
                          ? FaUserFriends
                          : role === "admin"
                          ? FaUserShield
                          : FaUserGraduate
                      }
                      boxSize={10}
                      color={useColorModeValue("blue.400", "blue.300")}
                      zIndex="docked" // Ensure the icon is above other elements
                    />
                  </Flex>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Welcome back!
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  bg={useColorModeValue("white", "gray.700")}
                  boxShadow={"lg"}
                  p={8}
                >
                  <Stack spacing={4}>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      isRequired
                    />
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      isRequired
                    />
                    <FormError error={error} />
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                    {role !== "admin" && (
                      <Stack pt={6} spacing={4}>
                        <Text align={"center"}>
                          New user?{" "}
                          <ChakraLink
                            color={"blue.400"}
                            onClick={toggleSignUp}
                            as="span"
                            cursor="pointer"
                          >
                            Sign Up
                          </ChakraLink>
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </Box>
                <Divider />
                <Stack
                  direction={"row"}
                  spacing={4}
                  justify={"center"}
                  mt={4}
                >
                  <RoleButton
                    role="admin"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Admin Role"
                  />
                  <RoleButton
                    role="student"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Student Role"
                  />
                  <RoleButton
                    role="affiliate"
                    currentRole={role}
                    onClick={toggleRole}
                    ariaLabel="Affiliate Role"
                  />
                </Stack>
              </Stack>
            </Box>
            <Box
              flex="1"
              p={8}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
               <Stack spacing={4} textAlign="center">
                <Heading fontSize={"4xl"} mb={4}>
                  {role === "affiliate"
                    ? "Affiliate Sign In"
                    : role === "admin"
                    ? "Admin Sign In"
                    : "Student Sign In"}
                </Heading>
                <Image
                  src={LoginImage}
                  alt="Login Illustration"
                  objectFit="cover"
                />
              </Stack>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
