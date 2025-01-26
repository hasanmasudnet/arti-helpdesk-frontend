import { z } from "zod";

export const nameValidation = z
  .string()
  .min(2, "Name must be atleast 3 characters")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name must not contain number or special characters");

export const signUpSchema = z.object({
  name: nameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" }),
  company: z.string().optional(),
  isaggree_terms_privacy: z.string().optional(),
});
