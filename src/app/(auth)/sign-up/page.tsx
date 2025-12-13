"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUpSchema, type TypeSignUpSchema } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TypeSignUpSchema) {
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-sign-up">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-sign-up">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
