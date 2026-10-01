import z from "zod";

export const getTodayString = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const createAmbulanceSchema = z.object({
  ambulanceNumber: z
    .string("Ambulance Number is required")
    .min(3, "Ambulance number must be at least 3 characters long")
    .max(50, "Ambulance number must not exceed 50 characters"),
  registrationNumber: z
    .string("Registration Number is required")
    .min(3, "Registration number must be at least 3 characters long")
    .max(100, "Registration number must not exceed 100 characters"),
  registrationExpiry: z
    .string("Registration expiry is required")
    .min(1, "Registration expiry is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Invalid date",
    })
    .refine((value) => value >= getTodayString(), {
      message: "Registration expiry must be today or a future date",
    }),
  vehicleType: z.enum(
    ["AC", "NON_AC", "ICU", "FREEZER", "AIR"],
    "Invalid vehicle type",
  ),
  model: z
    .string()
    .min(1, "Model is required")
    .max(100, "Model must not exceed 100 characters"),
  capacity: z
    .number("Capacity must be a number")
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1")
    .max(20, "Capacity must not exceed 20"),
});
