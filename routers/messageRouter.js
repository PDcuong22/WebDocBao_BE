const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/add", messageController.add);

router.post("/get", messageController.get);

router.get("/getUserChat/:userId", messageController.getUserChat);
router.get("/getMessagesUnread/:userId", messageController.getMessagesUnread);
router.put("/updateSeen/:messageId", messageController.updateSeen);

module.exports = router;