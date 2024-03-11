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

const homeController = {
  index: (req, res) => {
    // Tiếp nhận request
    // Xử lý dữ liệu của request: Validate
    // Truy vấn với db --> thông qua Model
    // Trả về response

    // res.send("<h1>HOME PAGE T_T</h1>");

    const title = "<i>Day la title1</i>";
    const check = true;
    const usersArr = ["user1", "user2", "user3"];

    // set session
    req.session.message = "Hello F8";
    req.session.user = {
      email: "user1@example.com",
      password: "123456",
    };

    // delete session
    delete req.session.message;

    res.render("home/index", { title, check, usersArr });
  },

  showProducts: (req, res) => {
    // console.log(req.session.message);
    // console.log(req.session.user);
    res.render("home/products", { layout: false }); // không kế thừa
  },
};

export default homeController;
