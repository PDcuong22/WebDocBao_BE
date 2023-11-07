const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        categoryName: { type: String, default: "" },
    }
);

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;