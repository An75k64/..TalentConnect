import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Alert,
  AlertIcon,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { FaEdit, FaMoneyBillWave, FaUserFriends, FaBriefcase, FaBell } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineBarChart } from 'react-icons/ai';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const DashboardCard = ({ title, icon, value, helpText, color }) => (
  <Card
    variant="outline"
    borderWidth={0}
    borderRadius="lg"
    overflow="hidden"
    bg={color}
    boxShadow="lg"
    transition="transform 0.3s ease-in-out"
    _hover={{ transform: 'scale(1.05)' }}
  >
    <CardHeader>
      <Flex align="center">
        {icon && <Box as={icon} w={12} h={12} color="white" />}
        <Text fontSize="lg" fontWeight="bold" ml={4} color="white">{title}</Text>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stat color="white">
        <StatLabel>{title}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

const ActivityChart = ({ data, title }) => (
  <Card
    variant="outline"
    borderWidth={0}
    borderRadius="lg"
    boxShadow="lg"
    bg="white"
  >
    <CardHeader>
      <Flex align="center">
        <Box as={AiOutlineBarChart} w={8} h={8} color="blue.500" />
        <Text fontSize="lg" fontWeight="bold" ml={4}>{title}</Text>
      </Flex>
    </CardHeader>
    <CardBody>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="referrals" stroke="#8884d8" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="jobsPosted" stroke="#82ca9d" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);

const RecentActivityModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="lg">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Recent Activity</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <List spacing={3}>
          <ListItem>
            <Flex justify="space-between">
              <Text>Referred User</Text>
              <Text color="gray.600">June 15, 2024</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex justify="space-between">
              <Text>Posted Job: Senior Developer</Text>
              <Text color="gray.600">June 14, 2024</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex justify="space-between">
              <Text>Referred User</Text>
              <Text color="gray.600">June 12, 2024</Text>
            </Flex>
          </ListItem>
        </List>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const NotificationsAlert = () => (
  <Alert status="info" mb={4}>
    <AlertIcon />
    You have new notifications! <Button variant="link" ml={2}>Check them out</Button>
  </Alert>
);

const DashboardAffiliate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBackground = useColorModeValue('white', 'gray.800');
  const cardTextColor = useColorModeValue('gray.700', 'gray.200');

  // Sample data for activity chart
  const activityData = [
    { date: 'Jan', referrals: 5, jobsPosted: 2 },
    { date: 'Feb', referrals: 10, jobsPosted: 3 },
    { date: 'Mar', referrals: 15, jobsPosted: 5 },
    { date: 'Apr', referrals: 20, jobsPosted: 6 },
    { date: 'May', referrals: 25, jobsPosted: 7 },
    { date: 'Jun', referrals: 30, jobsPosted: 8 },
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={12}>
      <Flex direction="column" align="center" maxW="7xl" mx="auto" px={4}>
        <Stack spacing={8} mb={10} textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" color={cardTextColor}>
            Affiliate Dashboard
          </Text>
          <NotificationsAlert />
          <Flex justify="space-between" align="center" w="full">
            <Button
              colorScheme="blue"
              leftIcon={<AiOutlinePlus />}
              as={Link}
              to="/jobs/post-job"
            >
              Post a New Job
            </Button>
            <Button
              colorScheme="teal"
              onClick={onOpen}
              leftIcon={<FaBell />}
            >
              Recent Activity
            </Button>
          </Flex>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <DashboardCard
            title="Total Referrals"
            icon={FaUserFriends}
            value="50"
            helpText="Total number of referrals"
            color={cardBackground}
          />
          <DashboardCard
            title="Jobs Posted"
            icon={FaBriefcase}
            value="10"
            helpText="Total number of jobs posted"
            color={cardBackground}
          />
          <DashboardCard
            title="Earnings"
            icon={FaMoneyBillWave}
            value="$2000"
            helpText="Total earnings from referrals"
            color={cardBackground}
          />
        </SimpleGrid>
        <Box mt={10}>
          <ActivityChart data={activityData} title="Monthly Activity" />
        </Box>
      </Flex>
      <RecentActivityModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DashboardAffiliate;
