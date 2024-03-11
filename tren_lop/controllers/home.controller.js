/*
Controller: 
- Tên Controler (Hay gọi tắt là controller)
- Action --> Hành động

Ví dụ: Controller Users sẽ có các action: 
- Thêm
- Sửa
- Xóa
- Hiển thị
*/

const homeController = {
  index: (req, res) => {
    //Tiếp nhận request
    //Xử lý dữ liệu của request: Validate
    //Truy vấn với Database --> Thông qua Model
    //Trả về response

    // res.send("<h1>Học Express không khó</h1>");

    const title = "<i>Express không khó!</i>";
    const title2 = "Banner here, 852";

    const check = true;

    const users = ["user 1", "user 2", "user 3"];

    //set session
    req.session.message = "Hello F88";
    req.session.user = {
      name: "user 1",
      email: "user1@example.com",
    };

    // delete session
    delete req.session.message;

    res.render("home/index", { title, title2, check, users });
  },

  showProducts: (req, res) => {
    // layout: mặc định là true, kế thừa layout.ejs
    // res.render("home/products");

    console.log(req.session.message);
    console.log(req.session.user);

    res.render("home/products", { layout: false });
  },
};

export default homeController;
