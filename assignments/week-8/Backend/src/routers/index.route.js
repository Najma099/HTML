import { Router} from "express";
import userRoot from "./user.route.js"
import accountRoutes from "./routes/account.js";

const router = Router();
router.use('/user', userRoot);
router.use('account', accountRoutes);
export default router;
