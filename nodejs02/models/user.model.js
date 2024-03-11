// Tư duy model

/*
+ Mỗi model tương ứng với 1 table
+ Trong 1 controller có thể có nhiều model
*/
const sql = require("../utils/db.js");
module.exports = {
  all: async (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;

    if (status !== undefined) {
      filter = sql`${filter} AND status = ${status}`;
    }

    if (keyword?.length) {
      filter = sql`${filter} AND (LOWER(name) LIKE ${
        "%" + keyword + "%"
      } OR LOWER(email) LIKE ${"%" + keyword + "%"})`;
    }

    return await sql`SELECT * FROM users ${filter} ORDER BY created_at DESC`;
  },
  emailExisted: async (email, id = 0) => {
    const ignore = id > 0 ? sql` AND id != ${id}` : sql``;

    const result = await sql`SELECT id FROM users 
    WHERE email=${email} ${ignore}`;

    return result.length ? false : true;
    // nếu email đã TỒN TẠI --> trả về false, ngược lại true
  },
  create: async (data = {}) => {
    const { name, email, status } = data;
    return await sql`INSERT INTO users (name, email, status)
    VALUES(${name}, ${email}, ${status})`;
  },
  find: async (id) => {
    return sql`SELECT name, email, status FROM users WHERE id=${id}`;
  },
  update: async (data, id) => {
    const { name, email, status } = data;
    return await sql`UPDATE users
    SET name=${name}, email=${email}, status=${status}, updated_at=now()
    WHERE id=${id}`;
  },
  delete: async (id) => {
    return sql`DELETE FROM users WHERE id=${id}`;
  },
};
