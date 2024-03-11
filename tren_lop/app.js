import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import routerIndex from "./routes/index.js";
import flash from "connect-flash";
import routerUsers from "./routes/users.js";
import routerAuth from "./routes/auth.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import session from "express-session";

// var flash = require("connect-flash");
const app = express();
const port = 8080;

// Static file
app.use(express.static("public"));

// setup template engine
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressEjsLayouts); // sử dụng layout
app.set("layout", "layouts/layout.default.ejs"); // thay đổi đường dẫn layout mặc định

//Session
app.use(
  session({
    name: "f88_session",
    secret: "f88",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Parse body
app.use(
  bodyParser.urlencoded({
    extends: false,
  })
);

//Routing
app.use(routerAuth);

// cach 1:
// app.use(authMiddleware, routerIndex);
// app.use("/users", authMiddleware, routerUsers);

// cach 2:
app.use(authMiddleware);
app.use(routerIndex);
app.use("/users", routerUsers);

//Listener
app.listen(port, () => {
  console.log("Server đang chạy: http://localhost:8080");
});
