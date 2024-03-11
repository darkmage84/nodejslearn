import { object } from "yup";

import { getErrors } from "../utils/validate";

const authController = {
  login: (req, res) => {
    // res.send("<h1>Login</h1>");
    // const msg = req.session.msg;
    // const msg = req.flash("msg");

    res.render("auth/login", {
      layout: "layouts/layout.auth.ejs",
    });
  },

  handleLogin: async (req, res) => {
    const { email, password } = req.body;

    // flash()
    // const errors = {};
    // if (!email) {
    //   errors.email = "Email khong duoc de trong";
    // }
    // if (!password) {
    //   errors.password = "Password khong duoc de trong";
    // }
    // // req.session.msg = "Successfully logged in";
    // req.flash("msg", "success");

    //schema yup

    const schema = object({
      email: string()
        .required("email bat buoc phai nhap")
        .email("email khong dung dinh dang"),
      password: string().required(),
    });
    try {
      const data = await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (e) {
      // console.log(e.inner);
      const errors = e.inner.map(({ path, message }) => [path, message]);
      req.flash("errors", errors);
    }

    // return res.send("submit");
    return res.redirect("/dang-nhap");

    // return res.status(404).json(data);
  },
};

export default authController;
