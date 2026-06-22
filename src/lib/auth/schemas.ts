import { z } from "zod";

/**
 * schemas.ts -- zod schemas for the auth forms. Error messages mirror the
 * page-copy Auth section verbatim where it specifies one.
 */

const password = z
  .string()
  .min(8, "Make it a little stronger: 8+ characters with a number.")
  .regex(/[0-9]/, "Make it a little stronger: 8+ characters with a number.");

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Enter your name."),
    email: z.string().email("Enter a valid email address."),
    password,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Those two passwords do not match.",
    path: ["confirmPassword"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});
export type ForgotValues = z.infer<typeof forgotSchema>;

export const resetSchema = z
  .object({
    password,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Those two passwords do not match.",
    path: ["confirmPassword"],
  });
export type ResetValues = z.infer<typeof resetSchema>;
