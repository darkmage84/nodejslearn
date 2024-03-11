import express from "express";
import routerOrders from "./orders.js";
import userController from "../controllers/user.controller.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// HTTP GET

// Users Router
router.get("/", userController.index);

router.get("/add", userController.add);

// dynamic router
router.get("/edit/:id", userController.edit);

// users/orders Router
router.use(roleMiddleware);
router.use("/orders", routerOrders);

export default router;
