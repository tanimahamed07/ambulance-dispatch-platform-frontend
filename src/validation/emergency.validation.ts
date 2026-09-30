import z from "zod";

export const emergenciesRequestSchema = z.object({
  patientName: z
    .string()
    .min(2, "Patient name must be at least 2 characters long")
    .max(100, "Patient name must not exceed 100 characters"),
  patientPhone: z
    .string()
    .regex(
      /^01[3-9]\d{8}$/,
      "Invalid Bangladesh phone number format (e.g., 01712345678)",
    ),
  emergencyType: z.enum([
    "ACCIDENT",
    "CARDIAC",
    "PREGNANCY",
    "TRAUMA",
    "BREATHING_PROBLEM",
    "OTHER",
  ]),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  pickupAddress: z
    .string()
    .min(5, "Pickup address must be at least 5 characters long")
    .max(200, "Pickup address must not exceed 200 characters"),
  pickupLatitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  pickupLongitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});
