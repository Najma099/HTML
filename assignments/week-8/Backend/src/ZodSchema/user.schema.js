import { z } from "zod";

export const UsernameSchema = z.object({
  username: z.string().email('Invalid email format')
});

export const UserSchema = z.object({
  username: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Minimum 6 characters'),
  firstName: z.string(),
  lastName: z.string()
});

export const SignInSchema = UserSchema.pick({
  username: true,
  password: true
});

export const UpdateSchema = z.object({
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional()
});

export const PasswordSchema = z.object({
  oldPassword: z.string().min(8, 'Minimum 8 characters'),
  newPassword: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string().min(8, 'Minimum 8 characters')
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
