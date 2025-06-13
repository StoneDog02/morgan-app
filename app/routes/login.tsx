import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Paper,
} from "@mantine/core";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { login, createUserSession, getUser } from "~/utils/session.server";
import { useEffect, useRef } from "react";

export async function loader({ request }: { request: Request }) {
  const user = await getUser(request);
  if (user) return redirect("/");
  return null;
}

function validateEmail(email: string) {
  if (typeof email !== "string" || email.length < 3 || !email.includes("@")) {
    return `Invalid email address`;
  }
}

function validatePassword(password: string) {
  if (typeof password !== "string" || password.length < 6) {
    return `Password must be at least 6 characters`;
  }
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const redirectTo = form.get("redirectTo") || "/";

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return json(
      { formError: `Form not submitted correctly.` },
      { status: 400 }
    );
  }

  const fields = { email, password };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const user = await login({ email, password });
  if (!user) {
    return json(
      {
        fields,
        formError: `Email/Password combination is incorrect`,
      },
      { status: 400 }
    );
  }

  return createUserSession(user.id, redirectTo);
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.fieldErrors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.fieldErrors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container size="xs" py="xl">
      <Paper shadow="md" p="xl" withBorder>
        <Title order={1} mb="xl" ta="center">
          Log In
        </Title>

        <Form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />

          <div>
            <TextInput
              ref={emailRef}
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              error={actionData?.fieldErrors?.email}
              defaultValue={actionData?.fields?.email}
              required
              mb="md"
            />

            <PasswordInput
              ref={passwordRef}
              label="Password"
              id="password"
              name="password"
              autoComplete="current-password"
              error={actionData?.fieldErrors?.password}
              defaultValue={actionData?.fields?.password}
              required
              mb="xl"
            />

            {actionData?.formError ? (
              <Text c="red" size="sm" mb="md">
                {actionData.formError}
              </Text>
            ) : null}

            <Button type="submit" fullWidth mb="md">
              Log In
            </Button>

            <Text ta="center" size="sm">
              Don't have an account?{" "}
              <Link
                to={{
                  pathname: "/register",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </Text>
          </div>
        </Form>
      </Paper>
    </Container>
  );
}
