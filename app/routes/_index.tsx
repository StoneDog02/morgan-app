import type { MetaFunction } from "@remix-run/node";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  BackgroundImage,
  Box,
  Paper,
} from "@mantine/core";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2940&auto=format&fit=crop"
        h={400}
        className="relative"
      >
        <Container size="lg" className="relative h-full">
          <div className="flex flex-col justify-center h-full text-center text-white">
            <Title order={1} size="3rem" fw={900} className="mb-4">
              Transform Your Fitness Journey with
              <Text component="span" className="text-blue-400">
                {" "}
                Expert Guidance
              </Text>
            </Title>
            <Text size="xl" className="max-w-2xl mx-auto mb-6">
              Access daily workouts, join live training sessions, and get
              personalized coaching to achieve your fitness goals.
            </Text>
            <Group justify="center">
              <Button
                component={Link}
                to="/register"
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/workouts"
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Browse Workouts
              </Button>
            </Group>
          </div>
        </Container>
      </BackgroundImage>

      <Container size="lg" className="flex-1 py-10">
        <Stack>
          <Title order={2} className="text-center mb-6">
            What We Offer
          </Title>
          <div className="grid md:grid-cols-3 gap-6">
            <Paper shadow="sm" p={0} radius="md" className="overflow-hidden">
              <BackgroundImage
                src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2940&auto=format&fit=crop"
                h={160}
              />
              <Box p="md">
                <Title order={3} className="mb-2">
                  Daily Workouts
                </Title>
                <Text size="sm">
                  Access a library of professional workout videos with detailed
                  instructions and modifications for all fitness levels.
                </Text>
              </Box>
            </Paper>

            <Paper shadow="sm" p={0} radius="md" className="overflow-hidden">
              <BackgroundImage
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2940&auto=format&fit=crop"
                h={160}
              />
              <Box p="md">
                <Title order={3} className="mb-2">
                  Live Sessions
                </Title>
                <Text size="sm">
                  Join group workout sessions led by expert trainers for
                  real-time motivation and guidance.
                </Text>
              </Box>
            </Paper>

            <Paper shadow="sm" p={0} radius="md" className="overflow-hidden">
              <BackgroundImage
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop"
                h={160}
              />
              <Box p="md">
                <Title order={3} className="mb-2">
                  Personal Support
                </Title>
                <Text size="sm">
                  Get direct access to trainers through our integrated messaging
                  system for personalized advice.
                </Text>
              </Box>
            </Paper>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
