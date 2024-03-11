module.exports = {
  isCourse: (user, courseId) => {
    // user: Object
    // courseId: id của khóa học cần kiểm tra
    const result = user.courses.find((item) => {
      return +item.id === +courseId;
    });
    return result ? true : false;
  },
};
