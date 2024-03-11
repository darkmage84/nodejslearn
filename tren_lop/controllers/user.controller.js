const userController = {
  index: (req, res) => {
    const { status, keyword } = req.query;
    console.log((status, keyword));

    /*
    
    */

    // res.send(`<h1>User List</h1>
    // <h2>Status: ${status}</h2>
    // <h2>Keyword: ${keyword}</h2>`);

    res.render("users/index", { keyword, status });
  },

  add: (req, res) => {
    res.send("<h1>Add</h1>");
  },

  edit: (req, res) => {
    const id = req.params.id;
    res.send("<h1>Sửa người dùng: " + id + "</h1>");
  },

  delete: (req, res) => {
    res.send("<h1>Delete</h1>");
  },

  orderList: (req, res) => {
    res.send("<h1>Order List</h1>");
  },

  orderCompleted: (req, res) => {
    res.send("<h1>Order Completed</h1>");
  },

  orderCancel: (req, res) => {
    res.send("<h1>Order Cancel</h1>");
  },
};

export default userController;
