const User = require("../models/userModel");

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        {
          new: true,
        }
      );
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
