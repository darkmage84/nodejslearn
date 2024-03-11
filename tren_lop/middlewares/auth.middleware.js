// Middleware là 1 fnc có 3 tham số
/*
1. resquest --> object
2. response --> object
3. next --> hàm
*/

const authMiddleware = (req, res, next) => {
  const isLogin = true;
  if (!isLogin) {
    res.redirect("/dang-nhap");
  }
  next(); //cho phép request đi tiếp
};

export default authMiddleware;
