import {
  Container,
  Title,
  Paper,
  Text,
  TextInput,
  Button,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";
import { format } from "date-fns";
import { useState } from "react";

export async function loader() {
  const messages = await prisma.message.findMany({
    include: {
      from: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return json({ messages });
}

export default function Messages() {
  const { messages } = useLoaderData<typeof loader>();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement message sending
    setNewMessage("");
  };

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Messages
      </Title>

      <Paper shadow="sm" p="md" withBorder>
        <ScrollArea h={400} mb="md">
          <Stack gap="md">
            {messages.map((message) => (
              <Paper
                key={message.id}
                shadow="xs"
                p="sm"
                withBorder
                className={`max-w-[80%] ${
                  message.from.role === "CUSTOMER"
                    ? "ml-auto bg-blue-50"
                    : "bg-gray-50"
                }`}
              >
                <Text size="sm" fw={500} mb={4}>
                  {message.from.firstName} {message.from.lastName}
                </Text>
                <Text size="sm" mb={2}>
                  {message.content}
                </Text>
                <Text size="xs" c="dimmed">
                  {format(new Date(message.createdAt), "PPp")}
                </Text>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <TextInput
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
