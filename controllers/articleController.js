const ArticleModel = require("../models/articleModel");

const getAllArticle = (req, res) => {
  ArticleModel.find({})
    .then((data) => {
      let sortData = data.sort((a, b) => {
        if (a.level < b.level) return -1;
        if (a.level > b.level) return 1;
        return 0;
      });
      res.json(sortData);
    })
    .catch((error) => {
      res.status(500).json({error: "Loi server"});
    });
};

const updateArticle = (req, res) => {
  const { _id } = req.params;

  ArticleModel.findByIdAndUpdate(_id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({error: "Loi server"});
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
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Lay article that bai" });
    });
};

module.exports = {
  getAllArticle,
  createArticle,
  getDetailArticle,
  getArticleById,
  getArtBySubCategoryId,
  updateArticle,
};
