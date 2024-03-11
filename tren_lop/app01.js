// const http = require("http");
// import thư viện http có sẵn của nodejs

// common JS
// const getProducts = require("./modules/products");
// getProducts();

// import
import http from "http";
import { getProducts } from "./modules/products.js";

getProducts();

const server = http.createServer((req, res) => {
  const path = req.url;

  //   console.log(req);
  res.setHeader("abc", "xyz"); //response header
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //   res.statusCode = 404;
  //   res.end("hello world, xin chào");

  if (path === "/") {
    res.write("<h1>Home Page</h1>");
  } else if (path === "/san-pham") {
    res.write("<h1>San Pham</h1>");
  } else {
    res.write("Page not found");
  }

  //   res.write("hello world, xin chào F88");
  res.end();
});

server.listen("8080", "localhost", () => {
  console.log("Server listening on port 8080, http://localhost:8080");
});

/*
Các package hay dùng của nodejs (có sẵn)
http
fs
path

CommonJS Module --> Sử dụng require
ES6 Moudle --> Sử dụng import/export 
*/
