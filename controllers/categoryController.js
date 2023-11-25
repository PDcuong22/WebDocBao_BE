const CategoryModel = require("../models/categoryModel");

const getAllCategory = (req, res) => {
  CategoryModel.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json("Loi server");
    });
};

const updateCategory = (req, res) => {
  const { _id } = req.params;

  CategoryModel.findByIdAndUpdate(_id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json("Loi server");
    });
};

const createCategory = (req, res) => {
  var categoryName = req.body.categoryName;
  CategoryModel.findOne({
    categoryName: categoryName,
  })
    .then((data) => {
      if (data) {
        res.json("category nay da ton tai");
      } else {
        return CategoryModel.create({ categoryName: categoryName });
      }
    })
    .then((data) => {
      res.json("Tao category thanh cong");
    })
    .catch((err) => {
      res.status(500).json("Tao category that bai");
    });
};

module.exports = { getAllCategory, createCategory, updateCategory };
