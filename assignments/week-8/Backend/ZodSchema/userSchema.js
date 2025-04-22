import zod from "zod";

export const UserSchema = zod.Object({
  username: zod.string().email('Invalid email format'),
  password: zod.string().min(8, 'Minimum 8 characters'),
  firstName: zod.string(),
  lastName: zod.string()
});

export const SignInSchema = UserSchema.pick({
  username: true,
  password: true
});

export const updateSchema = zod.object({
  username: zod.String().optional(),
  password: zod.String().optional(),
  firstName: zod.Strind().optional(),
  lastName: zod.String().optional()
});