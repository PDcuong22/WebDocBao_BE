const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcryptjs.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

const authController = {
  signup: async (req, res) => {
    try {
      // Kiem tra xem email da ton tai trong he thong chua
      const userExists = await userModel.findOne({
        email: req.body.email,
      });
      if (userExists) {
        return res.status(400).json({
          message: "Email này đã được đăng ký, bạn có muốn đăng nhập không?",
        });
      }

      // ma hoa password
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);

      // khoi tao user trong db
      const user = await userModel.create({
        ...req.body,
        password: hashedPassword,
      });

      // Thong bao cho nguoi dung dang ky thanh cong
      // Xoa mat khau di
      user.password = undefined;
      return res.status(200).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  signin: async (req, res) => {
    console.log(req.body);
    try {
      // Kiem tra xem email da ton tai trong he thong chua
      const userExists = await userModel.findOne({
        userName: req.body.userName,
      });
      if (!userExists) {
        return res.status(400).json({
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }

      if (!comparePasswords(req.body.password, userExists.password)) {
        return res.status(400).json({
          message: "Tài khoản hoặc mật khẩu không đúng",
        });
      }

      userExists.password = undefined;
      return res.status(200).json({
        user: userExists,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};

module.exports = authController;
