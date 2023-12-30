const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
