/*
Middleware là 1 function có 3 tham số
- req --> object
- res --> object
- next --> hàm
*/

const authMiddleware = (req, res, next) => {
  const isLogin = true;
  if (!isLogin) {
    res.redirect("/dang-nhap");
  }
  next(); // cho phep request di tiep
};

export default authMiddleware;
