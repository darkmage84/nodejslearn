// import thư viện http có sẵn của nodejs
// const http = require("http");
import http from "http";

// import-reuire
// const getProduct = require("./modules/products");
// getProduct();

// import-es6
import { getProduct } from "./modules/products.js";
getProduct();

// tạo server
const server = http.createServer((req, res) => {
  //   console.log(req);
  const path = req.url;

  // cookie
  const cookie = req.headers["cookie"];
  //   console.log(cookie);

  // method
  const method = req.method;
  //   console.log(method);

  // xử lý dữ liệu, logic --> truy vấn với db --> trả về dữ liệu

  // Phản hồi về phía CLIENT
  // set Response header
  res.setHeader("name", "abcxyz");
  res.setHeader("content-type", "text/html; charset=utf-8"); // tieng viet

  // set status code
  //   res.statusCode = 444;

  // set cookies
  res.setHeader("Set-Cookie", "name=wangbinh;path=/;Max-Age=86400;HttpOnly");

  if (path === "/") {
    // ghi ra man hinh
    res.write('<h1>Res.Write("Noi dung") HOME PAGE</h1>');
  } else if (path === "/san-pham") {
    res.write("<h1>San pham</h1>");
  } else {
    res.write("<h1>Page Not Found</h1>");
  }

  // output monitoring
  //   res.end("<h1>thay đổi lần 1</h1>");
  res.end();
});

server.listen("8080 ", "localhost", () => {
  console.log("server listening on port 8080: http://localhost:8080");
});

/*
3 gói sử dụng thường xuyên, có sẵn trong node.js
- http
- fs : file system
- path : 

CommonJS Module --> sử dụng require
ES6 --> sử dụng import/export
*/
