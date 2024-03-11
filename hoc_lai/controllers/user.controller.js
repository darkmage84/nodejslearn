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

const userController = {
  index: (req, res) => {
    const { status, keyword } = req.query;

    /*
    Request: 
    - Nhận thông tin
    - Validate: xác thức

    Model: xử lý dữ liệu

    Xử lý các logic nghiệp vụ (nếu có)

    View: trả dữ liệu cho client
    */

    res.render("users/index", { status, keyword });
  },

  add: (req, res) => {
    res.send("<h1>Add new USER?</h1>");
  },

  edit: (req, res) => {
    const id = req.params.id;
    res.send("<h1>Edit in4 USER: " + id + "</h1>");
  },

  orderList: (req, res) => {
    res.send("<h1>Orders list ...</h1>");
  },

  orderCompleted: (req, res) => {
    res.send("<h1>Orders Completed list ...</h1>");
  },

  orderCancel: (req, res) => {
    res.send("<h1>Orders Cancel list ...</h1>");
  },
};

export default userController;
