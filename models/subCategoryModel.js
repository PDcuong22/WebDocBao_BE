const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
    {
        subCategoryName: { type: String, maxlength: 160, default: "" },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId
        }
    }
);

const SubCategoryModel = mongoose.model("subCategories", SubCategorySchema);

module.exports = SubCategoryModel;