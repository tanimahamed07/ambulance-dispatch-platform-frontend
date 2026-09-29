import z from "zod";

export const callerRegistrationSchema = z
  .object({
    name: z
      .string("Name must be a string")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: z.string().email("Not email!!"),
    password: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
      .regex(/[0-9]/, "Password must contain at least 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 Special Character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    contactNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
        message: "Please provide a valid Bangladeshi phone number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain at least 1 Number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 Special Character",
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export const passwordRules = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "One number",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "One special character",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
      .regex(/[0-9]/, "Password must contain at least 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 Special Character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
