import { z, ZodError } from "zod";

export const createUserSchema = z.object({
        first_name: z
          .string({
            message: "First name is required",
          })
          .trim()
          .min(1),
        last_name: z
          .string({
            message: "Last name is required",
          })
          .trim()
          .min(1),
        email: z
          .email({
            message: "please provided a valid email",
          })
          .trim()
          .min(1),
        password: z
          .string()
          .trim()
          .min(6, "password must be at least 6 characters!"),
      });