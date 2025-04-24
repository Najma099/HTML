import express from "express";
import { Zodmiddleware } from "../middleware/Zod.middleware.js";
import { Authmiddleware } from "../middleware/Auth.middleware.js";
import { UserSchema, SignInSchema} from "../ZodSchema/user.schema.js";
import { RefreshedToken, SignUp, SignIn, ChangeDetails , ChangePassword,GetUsers} from "../controllers/user.controller.js";
const router = express.Router();


router.post("/signUp", Zodmiddleware(UserSchema), SignUp);
router.post("/signin", Zodmiddleware(SignInSchema), SignIn);
router.post("/refresh-token", RefreshedToken);
router.put("/change-details", Authmiddleware, ChangeDetails);
router.put("/change-password", Authmiddleware, ChangePassword);
router.get("/bulk", Authmiddleware, GetUsers);

export default router;