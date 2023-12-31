const commentModal = require("../models/commentModel");

const commentController = {
  getComments: async (req, res) => {
    try {
      const comments = await commentModal
        .find({ article: req.params.id })
        .populate("author");
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createComment: async (req, res) => {
    try {
      const comment = await commentModal.create(req.body);
      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  adminLikeComment: async (req, res) => {
    try {
      const comment = await commentModal.findById(req.params.id);
      if (comment.adminLikes) {
        comment.adminLikes = false;
      } else {
        comment.adminLikes = true;
      }
      await comment.save();

      return res.status(200).json(comment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  editComment: async (req, res) => {
    try {
      const newComment = await commentModal.findByIdAndUpdate(
        req.params.id,
        {
          comment: req.body.comment,
          edited: true,
        },
        { new: true }
      );
      return res.status(200).json(newComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteComment: async (req, res) => {
    try {
      const deletedComment = await commentModal.findByIdAndDelete(
        req.params.id
      );
      return res.status(200).json(deletedComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = commentController;
