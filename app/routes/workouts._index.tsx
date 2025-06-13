import {
  Container,
  Title,
  Grid,
  Card,
  Image,
  Badge,
  Text,
  Group,
} from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import type { Workout } from "@prisma/client";

export async function loader() {
  const workouts = await prisma.workout.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ workouts });
}

export default function Workouts() {
  const { workouts } = useLoaderData<typeof loader>();

  return (
    <Container size="lg" py="xl">
      <Title order={1} className="mb-8">
        Available Workouts
      </Title>

      <Grid>
        {workouts.map((workout: Workout) => (
          <Grid.Col key={workout.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={workout.thumbnail || "/placeholder-workout.jpg"}
                  height={160}
                  alt={workout.title}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{workout.title}</Text>
                <Badge color={workout.isLive ? "red" : "blue"}>
                  {workout.isLive ? "LIVE" : workout.type}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" mb="md">
                {workout.description}
              </Text>

              <Group justify="space-between">
                <Badge variant="light">{workout.duration} mins</Badge>
                <Badge variant="light" color="grape">
                  {workout.difficulty}
                </Badge>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
