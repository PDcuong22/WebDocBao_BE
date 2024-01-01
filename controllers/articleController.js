const ArticleModel = require("../models/articleModel");

const getAllArticle = (req, res) => {
  ArticleModel.find({})
    .populate("subCategoryId")
    .then((data) => {
      let sortData = data.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      res.json(sortData);
    })
    .catch((error) => {
      res.status(500).json({ error: "Loi server" });
    });
};

const updateArticle = (req, res) => {
  const { _id } = req.params;

  ArticleModel.findByIdAndUpdate(_id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Loi server" });
    });
};

const createArticle = (req, res) => {
  var name = req.body.articleName;
  ArticleModel.findOne({
    articleName: name,
    subCategoryId: req.body.subCategoryId,
  })
    .then((data) => {
      if (data) {
        res.status(400).json({ error: "Article này đã tồn tại" });
      } else {
        return ArticleModel.create(req.body);
      }
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Tao article that bai" });
    });
};

const deleteArticle = (req, res) => {
  const { id } = req.params;
  ArticleModel.findByIdAndDelete(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getDetailArticle = (req, res) => {
  ArticleModel.find({})
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId",
      },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

const getArticleById = (req, res) => {
  const { id } = req.params;
  ArticleModel.find({
    _id: id,
  })
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId", // populate các articles trong mỗi subcategory
      },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

const getArtBySubCategoryId = (req, res) => {
  const { subCateId } = req.params;
  ArticleModel.find({
    subCategoryId: subCateId,
  })
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId", // populate các articles trong mỗi subcategory
      },
    })
    .then((data) => {
      let sortData = data.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      res.json(sortData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

const getArtByLevel = (req, res, next) => {
  const { subCateId, level } = req.params;
  ArticleModel.find({
    subCategoryId: subCateId,
    level: level,
  })
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId", // populate các articles trong mỗi subcategory
      },
    })
    .then((data) => {
      res.json(data);
      let sortData = data.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      res.json(sortData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

const getArtByLevelSmall = (req, res, next) => {
  const { subCateId } = req.params;
  ArticleModel.find({
    subCategoryId: subCateId,
  })
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId", // populate các articles trong mỗi subcategory
      },
    })
    .then((data) => {
      let dataMain = data?.filter((item) => item.level !== 1);
      let sortData = dataMain.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });

      res.json(sortData);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

// Lấy các bài báo của một subcategory nhưng không chứa bài báo hiện tại
const getArtBySubCategoryIdNot = (req, res, next) => {
  const { subCateId } = req.params;
  var articleId = req.body.articleId;
  console.log("articleId:", req.body.articleId);
  ArticleModel.find({
    subCategoryId: subCateId,
  })
    .populate("authorId")
    .populate({
      path: "subCategoryId",
      populate: {
        path: "categoryId", // populate các articles trong mỗi subcategory
      },
    })
    .then((data) => {
      let dataMain = data?.filter((item) => item._id.toString() !== articleId);
      let sortData = dataMain.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      });
      res.json(sortData);
    })
    .catch((error) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

const like = async (req, res) => {
  const { id } = req.params;
  const article = await ArticleModel.findById(id);
  if (article.like.includes(req.body.userId)) {
    const userIndex = article.like.findIndex(
      (u) => u.toString() === req.body.userId
    );
    article.like.splice(userIndex, 1);
  } else {
    article.like.push(req.body.userId);
  }
  await article.save();
  res.json(article);
};

module.exports = {
  getAllArticle,
  createArticle,
  getDetailArticle,
  getArticleById,
  getArtBySubCategoryId,
  deleteArticle,
  updateArticle,
  getArtByLevel,
  getArtByLevelSmall,
  getArtBySubCategoryIdNot,
  like,
};
