import { z } from "zod";

export const createHospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90, "Invalid latitude"),
  longitude: z.number().min(-180).max(180, "Invalid longitude"),
  emergencyAvailable: z.boolean(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});
