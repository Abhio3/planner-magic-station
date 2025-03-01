
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const studyPlanSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  category: z.string().min(1, "Category is required"),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["not-started", "in-progress", "completed"]).default("not-started"),
});

export type AuthFormValues = z.infer<typeof authSchema>;
export type StudyPlanFormValues = z.infer<typeof studyPlanSchema>;
