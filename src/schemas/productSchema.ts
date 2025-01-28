import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ message: "Product name must be a string" })
    .min(3, { message: "minimum 3 characters" }),
  category_id: z.string().min(1, { message: "Select a category" }),
  price: z
    .string()
    .min(1, { message: "price required" })
    .regex(/^\d+$/, { message: "price must be a number" }),
  url: z
    .string({ message: "Product url must be a string" })
    .url({ message: "url must be valid" }),
  //   image: z.string().optional(),
  description: z.string().min(10, { message: "minimum 10 characters" }),
  ai_instructions: z.string({ message: "must be string" }).optional(),
  status: z.string().min(1, { message: "Select a status" }),
});
