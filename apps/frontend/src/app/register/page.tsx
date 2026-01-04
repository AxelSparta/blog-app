"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { registerUser } from "@/lib/services/users";

const formSchema = z.object({
  username: z.string()
  .trim()
  .min(3, 'Username must be at least 3 characters long.')
  .max(30, 'Username must be at most 30 characters long.')
  .regex(
    /^(?!.*__)(?!.*\.\.)(?!.*\.$)(?!^\.)[A-Za-z][A-Za-z0-9._]{2,29}$/,
    'Username must start with a letter and can only contain letters, numbers, underscores, and dots. No consecutive underscores or dots allowed.'
  ),
  password: z
    .string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one number, one uppercase letter, and one lowercase letter."
    ),
  confirmPassword: z
    .string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one number, one uppercase letter, and one lowercase letter."
    ),
  email: z.string().email(),
});

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "" });


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError({ message: "" });
    const { username, email, password, confirmPassword  } = values;
    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match." });
      return;
    }
    setLoading(true);
    
    try {
      await registerUser(username, email, password)
      console.log('todo ok')
    } catch (err: Error | any) {
      console.error(err)
      setError({ message: err.message || "An unexpected error occurred." });
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
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="axel@gmail.com" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? "Registering..." : "Register user"}
          </Button>
        </form>
      </Form>
      {error.message && (
        <p className="mt-4 text-red-600 text-center">{error.message}</p>
      )}
    </main>
  );
}
