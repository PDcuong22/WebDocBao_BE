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
      res.status(500).json("Loi server");
    });
};

const updateArticle = (req, res) => {
    
};

const createArticle = (req, res) => {
    var name = req.body.articleName;
  ArticleModel.findOne({
    articleName: name,
  })
    .then((data) => {
      if (data) {
        res.json("article nay da ton tai");
      } else {
        return ArticleModel.create(req.body);
      }
    })
    .then((data) => {
      res.json("Tao article thanh cong");
    })
    .catch((err) => {
      res.status(500).json("Tao article that bai");
    });
};

const getDetailArticle = (req, res) => {
    
};

const getArticleById = (req, res) => {
    
};

const getArtBySubCategoryId = (req, res) => {
    
};

module.exports = {
    getAllArticle,
    createArticle,
    getDetailArticle,
    getArticleById,
    getArtBySubCategoryId,
    updateArticle,
};