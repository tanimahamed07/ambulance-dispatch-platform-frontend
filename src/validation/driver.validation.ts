import z from "zod";

export const applyDriverSchema = z.object({
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, {
      message: "Please provide a valid Bangladeshi phone number",
    }),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters"),
  licenseNumber: z
    .string()
    .min(5, "License number must be at least 5 characters")
    .max(50, "License number must not exceed 50 characters"),
  licenseUrl: z.string().url("Please provide a valid URL for license"),
  licensePublicId: z.string().min(1, "License public ID is required"),
  licenseExpiry: z
    .string()
    .min(1, "License expiry date is required")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate > today;
      },
      {
        message: "License expiry date must be in the future",
      },
    ),
  nidNumber: z
    .string()
    .min(10, "NID number must be at least 10 characters")
    .max(17, "NID number must not exceed 17 characters")
    .regex(/^\d+$/, "NID number must contain only digits"),
});
