import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userController.orderList);

router.get("/completed", userController.orderCompleted);

router.get("/cancel", userController.orderCancel);

export default router;
