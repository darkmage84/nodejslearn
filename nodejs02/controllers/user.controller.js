const userModel = require("../models/user.model.js");
const moment = require("moment");
const { object, string } = require("yup");

module.exports = {
  index: async (req, res) => {
    const { status, keyword } = req.query;
    let statusBool;
    if (status === "active" || status === "inactive") {
      statusBool = status === "active" ? true : false;
    }

    // đọc dữ liệu từ db
    const users = await userModel.all(statusBool, keyword);

    // flash msgAddSuccess
    const msgAddSuccess = req.flash("msgAddSuccess");

    res.render("users/index.ejs", {
      users,
      moment,
      status,
      keyword,
      msgAddSuccess,
    });
  },

  // thêm người dùng
  add: (req, res) => {
    // const errors = req.flash("errors");
    // console.log(req.errors);
    res.render("users/add.ejs", { req });
  },
  handleAdd: async (req, res) => {
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("exists", "Email đã tồn tại trê hệ thống", async (value) => {
          return await userModel.emailExisted(value);
        }),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      body.status = body.status === "1" ? true : false;
      await userModel.create(body);

      // đưa ra thông báo thành công
      req.flash("msgAddSuccess", "Thêm người dùng thành công!");

      // khi thêm người dùng thành công sẽ điều hướng về trang /users
      return res.redirect("/users");
    } catch (error) {
      const errors = Object.fromEntries(
        error?.inner.map((item) => [item.path, item.message])
      );
      req.flash("errors", errors);
      req.flash("old", req.body);
    }

    return res.redirect("/users/add");
  },

  // sửa thông tin
  edit: async (req, res, next) => {
    const { id } = req.params;
    //
    req.session.currenId = id;
    const user = await userModel.find(id);

    // flash msgEditSuccess
    const msgEditSuccess = req.flash("msgEditSuccess");

    // xét trường hợp không tìm thấy user
    if (!user.length) {
      // đưa ra thông báo lỗi
      return next(
        new Error(
          "Không tìm thấy user có id là: " +
            id +
            ", vui lòng quay trở lại trang chủ!"
        )
      );
    }

    // lấy trạng thái của user trong trang edit
    user[0].status = user[0].status ? "1" : "0";

    // lấy thông tin cũ của user để field vào form
    req.old = user[0];

    // trang hiển thị
    res.render("users/edit.ejs", { req, msgEditSuccess });
  },
  handleEdit: async (req, res, next) => {
    // lấy id
    const { id } = req.params;

    if (id != req.session.currentId) {
      return next(new Error("404"));
    }

    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("exists", "Email đã tồn tại trên hệ thống", async (value) => {
          return await userModel.emailExisted(value, id);
        }),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      body.status = body.status === "1" ? true : false;
      await userModel.update(body, id);

      // đưa ra thông báo thành công
      req.flash("msgEditSuccess", "Sửa thông tin người dùng thành công!");
    } catch (e) {
      const errors = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      req.flash("errors", errors);
      req.flash("old", req.body);
    }

    // khi sửa người dùng thành công sẽ giữ nguyên trang edit
    return res.redirect("/users/edit/" + id);
  },

  // xóa người dùng
  delete: async (req, res, next) => {
    const { id } = req.params;
    const status = await userModel.delete(id);
    if (status) {
      req.flash("msgAddSuccess", "Xóa người dùng thành công");
    } else {
      req.flash("msgAddSuccess", "Xóa người dùng không thành công");
    }
    return res.redirect("/users");
  },
};
