
import {z} from "zod";

export const UserSchema = z.object({
  username: z.string().email({message: 'Invalid email format'}),
  password: z.string().min(6, 'Minimum 6 characters'),
  firstName: z.string(),
  lastName: z.string()
});

//export type UserParm = z.infer<typeof UserSchema>;