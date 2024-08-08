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
  Link,
  Image,
  Icon
} from "@chakra-ui/react";
import { FaUserShield, FaUserGraduate, FaUserFriends } from "react-icons/fa"; // Placeholder icons
import LoginImage from "../assets/images/Login/log.svg";
import RegisterImage from "../assets/images/Login/register.svg";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
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
    if (isAdmin) {
      console.log("Admin login");
    } else {
      console.log("Student/Affiliate login");
    }
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
    setIsSignUp(!isSignUp);
    setError("");
  };

  const toggleRole = (role) => {
    setIsAdmin(role === "admin");
    setIsAffiliate(role === "affiliate");
    setIsSignUp(false);
    setError("");
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")} mt={"50"}>
      <Flex w="full" maxW="1200px" mx="auto" direction={{ base: "column", md: "row" }}>
        {/* Conditional layout based on isSignUp state */}
        {isSignUp ? (
          <>
            <Box flex="1" p={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Stack spacing={4} textAlign="center">
                <Flex justify="center" mb={4}>
                  <Icon
                    as={isAdmin ? FaUserShield : isAffiliate ? FaUserFriends : FaUserGraduate}
                    boxSize={10}
                    color={useColorModeValue("blue.400", "blue.300")}
                    zIndex="docked" // Ensure the icon is above other elements
                  />
                </Flex>
                <Heading fontSize={"4xl"} mb={4}>
                  {isAdmin ? "Admin Sign Up" : isAffiliate ? "Affiliate Sign Up" : "Student Sign Up"}
                </Heading>
                <Image src={RegisterImage} alt="Register Illustration" objectFit="cover" />
              </Stack>
            </Box>
            <Box flex="1" p={8}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                <Stack align={"center"} spacing={4}>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Create an account to get started!
                  </Text>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
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
                    {error && <Text color="red.500">{error}</Text>}
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
                        <Link color={"blue.400"} onClick={toggleSignUp}>
                          Login
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
                <Divider />
                <Stack direction={"row"} spacing={4} justify={"center"} mt={4}>
                  <Button variant="link" onClick={() => toggleRole("admin")} isActive={isAdmin}>
                    Admin
                  </Button>
                  <Button variant="link" onClick={() => toggleRole("student")} isActive={!isAdmin && !isAffiliate}>
                    Student
                  </Button>
                  <Button variant="link" onClick={() => toggleRole("affiliate")} isActive={isAffiliate}>
                    Affiliate
                  </Button>
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
                      as={isAdmin ? FaUserShield : isAffiliate ? FaUserFriends : FaUserGraduate}
                      boxSize={10}
                      color={useColorModeValue("blue.400", "blue.300")}
                      zIndex="docked" // Ensure the icon is above other elements
                    />
                  </Flex>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Welcome back!
                  </Text>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
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
                    {error && <Text color="red.500">{error}</Text>}
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                    {!isAdmin && (
                      <Stack pt={6} spacing={4}>
                        <Text align={"center"}>
                          New user?{" "}
                          <Link color={"blue.400"} onClick={toggleSignUp}>
                            Sign Up
                          </Link>
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </Box>
                <Divider />
                <Stack direction={"row"} spacing={4} justify={"center"} mt={4}>
                  <Button variant="link" onClick={() => toggleRole("admin")} isActive={isAdmin}>
                    Admin
                  </Button>
                  <Button variant="link" onClick={() => toggleRole("student")} isActive={!isAdmin && !isAffiliate}>
                    Student
                  </Button>
                  <Button variant="link" onClick={() => toggleRole("affiliate")} isActive={isAffiliate}>
                    Affiliate
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Box flex="1" p={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Stack spacing={4} textAlign="center">
                <Heading fontSize={"4xl"} mb={4}>
                  {isAdmin ? "Admin Login" : isAffiliate ? "Affiliate Login" : "Student Login"}
                </Heading>
                <Image src={LoginImage} alt="Login Illustration" objectFit="cover" />
              </Stack>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
