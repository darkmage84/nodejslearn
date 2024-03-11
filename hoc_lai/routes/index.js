import express from "express";
import homeController from "../controllers/home.controller.js";

const router = express.Router();

// HTTP GET

// home page

//old
// router.get("/", (req, res) => {
//   res.send("<h1>Hoc Express - HOME PAGE</h1>");
// });
// new
router.get("/", homeController.index);

//product page
router.get("/san-pham", homeController.showProducts);

// user page
// ko lam vay
/* 
router.get("/users", (req, res) => {
  res.send("<h1>User list ...</h1>");
});
router.get("/users/add", (req, res) => {
  res.send("<h1>Add new USER?</h1>");
});
router.get("/users/edit", (req, res) => {
  res.send("<h1>Edit in4 USER?</h1>");
});
*/

// export
export default router;
