import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Group,
  Button,
  Badge,
} from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import type { WorkoutSession } from "@prisma/client";
import { format } from "date-fns";

export async function loader() {
  const sessions = await prisma.workoutSession.findMany({
    include: {
      workout: true,
      user: true,
    },
    where: {
      startTime: {
        gte: new Date(),
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return json({ sessions });
}

export default function Sessions() {
  const { sessions } = useLoaderData<typeof loader>();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Group Sessions</Title>
        <Button variant="filled" color="blue">
          Book a Session
        </Button>
      </Group>

      <Grid>
        {sessions.map((session) => (
          <Grid.Col key={session.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text fw={500} size="lg">
                  {session.workout.title}
                </Text>
                <Badge
                  color={session.status === "SCHEDULED" ? "blue" : "green"}
                >
                  {session.status}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="md">
                {session.workout.description}
              </Text>

              <Group gap="xs">
                <Text size="sm" fw={500}>
                  Date:
                </Text>
                <Text size="sm">
                  {format(new Date(session.startTime), "PPP")}
                </Text>
              </Group>

              <Group gap="xs">
                <Text size="sm" fw={500}>
                  Time:
                </Text>
                <Text size="sm">
                  {format(new Date(session.startTime), "p")} -{" "}
                  {format(new Date(session.endTime), "p")}
                </Text>
              </Group>

              <Button fullWidth mt="md">
                Join Session
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
