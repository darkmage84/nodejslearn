/*
Controller:
- Tên Controller (hay gọi tắt là controller)
- Action --> Hành động

Ví dụ: Controller Users sẽ có các action
- Thêm
- Sửa
- Xóa
- Hiển thị
*/

import { object, string } from "yup";
import { getError } from "../utils/validate.js";

const authController = {
  login: (req, res) => {
    // console.log("get form");

    // flash session msg
    // const msg = req.session.msg;
    // delete req.session.msg;

    const errors = req.flash("errors");
    // console.log(errors);

    // const msg = req.flash("msg");
    // console.log(msg);

    res.render("auth/login", {
      layout: "layouts/layout.auth.ejs",
      errors,
      getError,
    });
  },

  handleLogin: async (req, res) => {
    // const data = req.body;
    // console.log(data);
    const { email, password } = req.body;

    // const errors = {};
    // if (!email) {
    //   errors.email = "Please enter a valid email";
    // }
    // if (!password) {
    //   errors.password = "Please enter a valid password";
    // }
    // req.flash("errors", errors);

    const schema = object({
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .matches(/[^@gmail\.com]+$/, "Email không được ở dạng @gmail.com"),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .max(6, "Mật khẩu không được quá 6 kí tự"),
    });

    try {
      const data = await schema.validate(req.body, {
        abortEarly: false, // trả về tất cả lỗi
      });
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map(({ path, message }) => {
          return [path, message];
        })
      );
      req.flash("errors", errors);
      // console.log(errors);
      // console.log(e.inner[0].path, e.inner[0].message);
      // console.log(e.inner[1].path, e.inner[1].message);
    }

    // return res.send("Submit");

    // return res.status(404).json(data);

    // req.session.msg = "Login Success";
    // req.flash("msg", "Login Success");

    return res.redirect("/dang-nhap"); // redirect auto chạy GET
  },
};

export default authController;
