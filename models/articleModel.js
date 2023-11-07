const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
    {
        articleName: { type: String, default: "" },
        tittle: { type: String },
        header: { type: String },
        content: { type: String },
        content1: { type: String },
        content2: { type: String },
        authorId: {
            type: mongoose.SchemaTypes.ObjectId
        },
        subCategoryId: {
            type: mongoose.SchemaTypes.ObjectId
        },
        image: {
            type: String
        },
        imageTittle: {
            type: String
        }
    }
);

const ArticleModel = mongoose.model("articles", ArticleSchema);

module.exports = ArticleModel;