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
} from '@chakra-ui/react';
import { FaEdit, FaMoneyBillWave, FaUserFriends, FaBriefcase } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DashboardCard = ({ title, icon, value, helpText }) => (
  <Card
    variant="outline"
    borderWidth={1}
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    borderRadius="md"
    overflow="hidden"
    bg={useColorModeValue('white', 'gray.800')}
  >
    <CardHeader>
      <Flex align="center">
        {icon && <Box as={icon} w={10} h={10} color={useColorModeValue('blue.500', 'blue.300')} />}
        <Text fontSize="lg" fontWeight="bold" ml={4}>{title}</Text>
      </Flex>
    </CardHeader>
    <CardBody>
      <Stat>
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
    borderWidth={1}
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    borderRadius="md"
    bg={useColorModeValue('white', 'gray.800')}
  >
    <CardHeader>
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
    </CardHeader>
    <CardBody>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="referrals" stroke="#8884d8" />
        <Line type="monotone" dataKey="jobsPosted" stroke="#82ca9d" />
      </LineChart>
    </CardBody>
  </Card>
);

const AffiliateDashboard = () => {
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
          <Text fontSize="4xl" fontWeight="bold" color={cardTextColor}>Affiliate Dashboard</Text>
          <Flex justify="space-between" align="center" w="full">
            <Button
              colorScheme="blue"
              leftIcon={<AiOutlinePlus />}
              as={Link}
              to="/jobs/post-job"
            >
              Post a New Job
            </Button>
          </Flex>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <DashboardCard
            title="Earnings"
            icon={FaMoneyBillWave}
            value="$5,000"
            helpText="This month's earnings"
          />
          <DashboardCard
            title="Referrals"
            icon={FaUserFriends}
            value="120"
            helpText="Total referrals"
          />
          <DashboardCard
            title="Jobs Posted"
            icon={FaBriefcase}
            value="30"
            helpText="Jobs posted by you"
          />
        </SimpleGrid>

        <Stack spacing={10} mt={12} w="full">
          <ActivityChart data={activityData} title="Monthly Activity Overview" />

          <Box
            bg={cardBackground}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            borderRadius="md"
            p={6}
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">Recent Activity</Text>
            <Divider my={4} />
            <List spacing={3}>
              <ListItem>
                <Flex justify="space-between">
                  <Text>Referred User</Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>June 15, 2024</Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex justify="space-between">
                  <Text>Posted Job: Senior Developer</Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>June 14, 2024</Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex justify="space-between">
                  <Text>Referred User</Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>June 12, 2024</Text>
                </Flex>
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AffiliateDashboard;
