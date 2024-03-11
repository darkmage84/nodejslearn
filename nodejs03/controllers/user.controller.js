const moment = require("moment");

const model = require("../models/index");
const courseUtils = require("../utils/courses.utils");
const User = model.User;
const Phone = model.Phone;
const Group = model.Group;
const Course = model.Course;

// operator
const { Op } = require("sequelize");

module.exports = {
  index: async (req, res) => {
    const { status, group, keyword } = req.query;
    const filter = {
      // deleted_at: {
      //   [Op.not]: null,
      // },
    };

    // filter.status
    if (status === "active" || status === "inactive") {
      filter.status = status === "active" ? true : false;
    }

    // filter.email
    if (keyword) {
      // filter.email = {
      //   [Op.like]: `%${keyword.toLowerCase()}%`,
      // };
      filter[Op.or] = [
        {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ];
    }

    // filter.group
    if (group) {
      filter.group_id = group;
    }

    const limit = 3;
    const { page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const { rows: users, count } = await User.findAndCountAll({
      order: [["id", "desc"]],
      where: filter,
      // paranoid: false,
      limit,
      offset,
      include: [
        {
          model: Phone,
          as: "phones",
        },
        {
          model: Group,
          as: "group",
        },
      ],
    });

    const groups = await Group.findAll({
      order: [["name", "asc"]],
    });

    const totalPage = Math.ceil(count / limit);

    res.render("users/index", {
      users,
      moment,
      totalPage,
      page,
      groups,
      req,
    });
  },
  add: async (req, res) => {
    // course: khóa học
    const courses = await Course.findAll({
      order: [["name", "asc"]],
    });

    res.render("users/add", { courses });
  },
  handleAdd: async (req, res, next) => {
    const body = req.body;

    /*
    khai báo khóa học (courses) trong phần body
    */
    const courses = body.courses;

    try {
      const user = await User.create({
        name: body.name,
        email: body.email,
        status: +body.status === 1,
      });

      /*
      nếu tạo thành công thì redirect về trang /users
      */
      if (user) {
        /*
        nếu có đăng ký khóa học thì sẽ được thêm vào bảng trung gian
        */
        if (courses.length) {
          for (let i = 0; i < courses.length; i++) {
            const course = await Course.findByPk(courses[i]);
            await user.addCourse(course);
          }
        }

        return res.redirect("/users");
      }
    } catch (e) {
      return next(e); // gọi error handler
    }
    res.send("submit");
  },
  edit: async (req, res, next) => {
    // lấy id của user cần sửa
    const { id } = req.params;
    try {
      // tìm user theo id
      // const user = await User.findByPk(id);
      const user = await User.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Course,
            as: "courses",
          },
        ],
      });

      // kiểm tra xem user có id này có tồn tại hay không
      if (!user) {
        throw new Error("User not found");
      }

      // lấy thêm khóa học (courses)
      const courses = await Course.findAll({
        order: [["name", "asc"]],
      });

      // xuôi
      // const phones = await user.getPhone();
      // console.log(phones);
      // const phone = phones.phone;
      // console.log(phone);

      // ngược
      // const phones = await model.Phone.findOne({
      //   where: {
      //     phone: "0968047028",
      //   },
      // });
      // console.log(phones);
      // const userByPhone = await phones.getUser();
      // console.log(userByPhone);

      res.render("users/edit", { user, courses, courseUtils });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const courses = !Array.isArray(body.courses)
      ? [body.courses]
      : body.courses;

    /*
    biến trạng thái (status) kiểm tra xem có update thành công hay không?
    */
    const status = await User.update(
      {
        name: body.name,
        email: body.email,
        status: +body.status === 1,
      },
      {
        where: {
          id,
        },
      }
    );

    /*
    nếu update thành công
    */
    if (status && courses.length) {
      const coursesRequest = await Promise.all(
        courses.map((courseId) => Course.findByPk(courseId))
      );
      const user = await User.findByPk(id);
      await user.setCourses(coursesRequest);
    }

    // sau khi nhấn lưu, trở về trang edit
    return res.redirect("/users/edit/" + id);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
      force: true,
    });
    res.redirect("/users");
  },
};
