import { Router} from "express";
import userRoot from "./user.js"

const router = Router();
router.use('/user', userRoot);
export default router;
