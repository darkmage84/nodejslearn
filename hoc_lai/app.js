// import: có sẵn sẽ import ở trên
import express from "express";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";

import routerIndex from "./routes/index.js";
import routerUser from "./routes/users.js";
import routerAuth from "./routes/auth.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();
const port = 8080;

// Static file
app.use(express.static("public"));

// Setup Template engine
/*
EJS: Embedded JavaScript template engine.
*/
app.set("views", "./views");
app.set("view engine", "ejs");
// sử dụng layout
app.use(expressLayouts);
// thay đổi đường dẫn layout mặc định
app.set("layout", "layouts/layout.default.ejs");

// Parse body
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); // hỗ trợ nhận dữ liệu ở dạng: application/x-www-urlencoded
app.use(bodyParser.json()); // hỗ trợ nhận dữ liệu ở dạng: application/json

// Ở phiên bản > 4.16, có thể làm như sau, ko cài body-parser
/*
app.use(express.urlencoded());
app.use(express.json());
*/

// Session
app.use(
  session({
    name: "wb_session_id",
    secret: "meow meow",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Routing
app.use("/", routerAuth);
app.use(authMiddleware);
app.use("/", routerIndex);
app.use("/users", routerUser);

// Listener
app.listen(port, () => {
  console.log("Server listening on port 8080: http://localhost:8080");
});
