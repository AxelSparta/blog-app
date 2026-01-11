"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { loginUser } from "@/lib/services/auth";
import { useAuthStore, User } from "@/store/auth.store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInFormSchema } from "@repo/validations";
import type { z } from "zod";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "" });
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    setError({ message: "" });
    const { username, password } = values;
    setLoading(true);

    try {
      const { user }: { message: string; user: User } =
        await loginUser(username, password);
      const { id, email } = user;
      toast.success("Logged in successfully!");
      login({ id, username, email });
      router.push("/");
    } catch (err: unknown) {
      setError({
        message:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full max-w-md mx-auto py-10 px-2 flex-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="axelsparta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? "Registering..." : "Login"}
          </Button>
        </form>
      </Form>
      {error.message && (
        <p className="mt-4 text-red-600 text-center">{error.message}</p>
      )}
      <span className="block text-sm mt-4">
        Don&apos;t have an account? Go to{" "}
        <Link
          className="underline text-blue-400 hover:text-blue-600 font-bold"
          href="/register"
        >
          Register
        </Link>
      </span>
    </main>
  );
}
