import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(5, { message: "Category name must be at least 5 characters" })
    .max(100, { message: "Category name must be at most 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Category name must be alphabetic" }),
  description: z.string().optional(),
});
