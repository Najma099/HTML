import express from "express";
import { Authmiddleware } from "../middleware/Auth.middleware.js";
import { Balance , Transfer, GetTransactionHistory,Contact } from "../controllers/account.controller.js";

const router = express.Router();

router.get('/balance', Authmiddleware, Balance);
router.get('/contact', Authmiddleware,Contact )
router.post('/transfer', Authmiddleware, Transfer);
router.get('/history', Authmiddleware, GetTransactionHistory);

export default router;