"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /*
      liên kết với bảng phones
      quan hệ 1-1
      */
      User.hasOne(models.Phone, {
        foreignKey: "user_id",
        as: "phones",
      });

      /*
      liên kết với bảng groups
      quan hệ 1-None
      */
      User.belongsTo(models.Group, {
        foreignKey: "group_id",
        as: "group",
      });

      /*
      liên kết với bảng courses
      quan hệ N-M
      */
      User.belongsToMany(models.Course, {
        through: "users_courses",
        foreignKey: "user_id",
        as: "courses",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true, // kích hoạt xóa mềm
      deletedAt: "deleted_at",
    }
  );
  return User;
};
