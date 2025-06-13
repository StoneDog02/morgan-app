import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
} from "@remix-run/react";
import {
  MantineProvider,
  ColorSchemeScript,
  AppShell,
  Burger,
  Group,
  createTheme,
  Container,
  Title,
  Text,
  Button,
  Drawer,
  UnstyledButton,
  Avatar,
} from "@mantine/core";
import { useState } from "react";
import { NavLink } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getUser } from "~/utils/session.server";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import "./tailwind.css";

const theme = createTheme({
  primaryColor: "blue",
});

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  return json({ user });
}

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}

function Layout() {
  const { user } = useLoaderData<typeof loader>();
  const [opened, setOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" align="center">
            <NavLink
              to="/"
              className="text-xl font-bold no-underline hover:text-blue-500"
            >
              Complete Morgan
            </NavLink>
            <Group gap={40} visibleFrom="sm" className="flex-1 justify-center">
              <NavLink
                to="/workouts"
                className="no-underline hover:text-blue-500"
              >
                Workouts
              </NavLink>
              <NavLink
                to="/sessions"
                className="no-underline hover:text-blue-500"
              >
                Group Sessions
              </NavLink>
              <NavLink
                to="/products"
                className="no-underline hover:text-blue-500"
              >
                Shop
              </NavLink>
              <NavLink
                to="/messages"
                className="no-underline hover:text-blue-500"
              >
                Messages
              </NavLink>
            </Group>
            <Group gap="md">
              {user ? (
                <UnstyledButton
                  onClick={() => setDrawerOpened(true)}
                  className="hover:text-blue-500 flex items-center gap-2"
                >
                  <Avatar size="sm" color="blue" radius="xl">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </Avatar>
                </UnstyledButton>
              ) : (
                <Button
                  component={NavLink}
                  to="/login"
                  variant="subtle"
                  className="flex items-center gap-2"
                >
                  Log In
                </Button>
              )}
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                hiddenFrom="sm"
                size="sm"
              />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      {user && (
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          position="right"
          size="xs"
          title={`${user.firstName} ${user.lastName}`}
        >
          <div className="flex flex-col h-[calc(100vh-60px)]">
            <UnstyledButton
              className="mt-auto flex items-center gap-2 p-4 hover:bg-gray-100 rounded-md"
              onClick={() => {
                setDrawerOpened(false);
                // Add settings navigation here
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.432l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.432l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.248a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Settings
            </UnstyledButton>
          </div>
        </Drawer>
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <Container size="md" py="xl">
          <Title order={1} mb="md">
            {error.status} {error.statusText}
          </Title>
          <Text mb="xl">{error.data}</Text>
          <Button component={NavLink} to="/">
            Return to Home
          </Button>
        </Container>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Error">
      <Container size="md" py="xl">
        <Title order={1} mb="md">
          Application Error
        </Title>
        <Text mb="xl">{errorMessage}</Text>
        <Button component={NavLink} to="/">
          Return to Home
        </Button>
      </Container>
    </Document>
  );
}

export default function App() {
  return (
    <Document>
      <Layout />
    </Document>
  );
}
