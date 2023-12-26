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
} = require("../controllers/articleController");
const router = express.Router();

router.get("/", getAllArticle);
router.get("/:id", getArticleById);
router.get("/subCategory/:subCateId", getArtBySubCategoryId);
router.get("/info", getDetailArticle);
router.get("/subCategory/:subCateId/:level", getArtByLevel); // lấy theo level -> để lấy level
router.get("/subCategorySmall/:subCateId", getArtByLevelSmall);
router.post("/create", createArticle);
router.put("/:_id", updateArticle);
router.post("/subCategoryNot/:subCateId", getArtBySubCategoryIdNot);
router.delete("/:articleId", deleteArticle);

module.exports = router;