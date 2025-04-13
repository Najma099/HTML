import {z} from "zod";

const Schemaobj = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .max(10), 
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

export default Schemaobj;
