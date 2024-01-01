const express = require("express");
const {
  getAllArticle,
  createArticle,
  getDetailArticle,
  getArticleById,
  getArtBySubCategoryId,
  updateArticle,
  getArtByLevel,
  getArtByLevelSmall,
  getArtBySubCategoryIdNot,
  deleteArticle,
  like,
} = require("../controllers/articleController");
const {
  getComments,
  createComment,
  adminLikeComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");
const router = express.Router();

router.get("/", getAllArticle);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticle);
router.get("/subCategory/:subCateId", getArtBySubCategoryId);
router.get("/info", getDetailArticle);
router.get("/subCategory/:subCateId/:level", getArtByLevel); // lấy theo level -> để lấy level
router.get("/subCategorySmall/:subCateId", getArtByLevelSmall);
router.post("/create", createArticle);
router.put("/:_id", updateArticle);
router.post("/subCategoryNot/:subCateId", getArtBySubCategoryIdNot);

router.get("/comments/:id", getComments);
router.post("/comments/:id", createComment);
router.post("/comments/admin/like/:id", adminLikeComment);
router.put("/comments/:id", editComment);
router.delete("/comments/:id", deleteComment);
router.post("/like/:id", like);

module.exports = router;
