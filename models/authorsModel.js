const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
    {
        authorName: { type: String, default: "" },
    }
);

const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;