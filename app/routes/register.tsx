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
import { register, createUserSession, getUser } from "~/utils/session.server";
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

function validateName(name: string) {
  if (typeof name !== "string" || name.length < 2) {
    return `Name must be at least 2 characters`;
  }
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
  const redirectTo = form.get("redirectTo") || "/";

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return json(
      { formError: `Form not submitted correctly.` },
      { status: 400 }
    );
  }

  const fields = { email, password, firstName, lastName };
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
    firstName: validateName(firstName),
    lastName: validateName(lastName),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors, fields }, { status: 400 });
  }

  const user = await register({ email, password, firstName, lastName });
  if (!user) {
    return json(
      {
        fields,
        formError: `Something went wrong trying to create a new user.`,
      },
      { status: 400 }
    );
  }

  return createUserSession(user.id, redirectTo);
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.fieldErrors?.firstName) {
      firstNameRef.current?.focus();
    } else if (actionData?.fieldErrors?.lastName) {
      lastNameRef.current?.focus();
    } else if (actionData?.fieldErrors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.fieldErrors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Container size="xs" py="xl">
      <Paper shadow="md" p="xl" withBorder>
        <Title order={1} mb="xl" ta="center">
          Register
        </Title>

        <Form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />

          <div>
            <TextInput
              ref={firstNameRef}
              label="First Name"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              error={actionData?.fieldErrors?.firstName}
              defaultValue={actionData?.fields?.firstName}
              required
              mb="md"
            />

            <TextInput
              ref={lastNameRef}
              label="Last Name"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              error={actionData?.fieldErrors?.lastName}
              defaultValue={actionData?.fields?.lastName}
              required
              mb="md"
            />

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
              autoComplete="new-password"
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
              Create Account
            </Button>

            <Text ta="center" size="sm">
              Already have an account?{" "}
              <Link
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </Text>
          </div>
        </Form>
      </Paper>
    </Container>
  );
}
