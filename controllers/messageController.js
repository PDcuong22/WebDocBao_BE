const mongoose = require("mongoose");
const messageModel = require("../models/messageModel");
const User = require("../models/userModel");

module.exports = {
  add: async (req, res) => {
    const { from, to, message } = req.body;
    try {
      const addMessage = await messageModel.create({
        users: [from, to],
        message: {
          text: message.text,
        },
        sender: from,
        lastMessage: message.text,
      });
      return res.status(200).json(addMessage);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  get: async (req, res) => {
    const { from, to } = req.body;
    try {
      const messages = await messageModel
        .find({
          users: {
            $all: [from, to],
          },
        })
        .sort({ updateAt: 1 });

      const messData = messages.map((mess) => {
        return {
          _id: mess._id,
          fromSelf: mess.sender.toString() === from,
          messages: mess.message?.text,
          seen: mess.sender.toString() === from,
        };
      });
      return res.status(200).json(messData);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getMessagesUnread: async (req, res) => {
    const userId = req.params.userId;
    try {
      const messages = await messageModel
        .find({ users: userId, seen: false })
        .exec();

      const messData = messages.map((mess) => {
        return {
          fromSelf: mess.sender.toString() === userId,
          messages: mess.message?.text,
          seen: mess.sender.toString() !== userId,
        };
      });

      return res.json(messData);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  },

  getUserChat: async (req, res) => {
    const userId = req.params.userId;
    try {
      const messages = await messageModel.find({ users: userId }).exec();

      const lastMessagesMap = messages.reduce((map, message) => {
        message.users.forEach((user) => {
          if (user !== userId) {
            if (!map[user] || message.createdAt > map[user].createdAt) {
              map[user] = {
                lastMessage: message.message.text,
                seen: message.seen,
                createdAt: message.createdAt,
                messageId: message._id,
              };
            }
          }
        });
        return map;
      }, {});

      const usersInfo = await Promise.all(
        Object.keys(lastMessagesMap).map(async (uid) => {
          const userInfo = await User.findById(uid).exec();
          return {
            ...userInfo.toObject(),
            lastMessage: lastMessagesMap[uid].lastMessage,
            seen: lastMessagesMap[uid].seen,
            messageId: lastMessagesMap[uid].messageId,
          };
        })
      );

      return res.status(200).json(usersInfo);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  },

  updateSeen: async (req, res) => {
    try {
      const message = await messageModel.findByIdAndUpdate(
        req.params.messageId,
        {
          seen: true,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};