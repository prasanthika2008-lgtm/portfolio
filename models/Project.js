const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    github: {
        type: String
    },
    live: {
        type: String
    }
});

module.exports = mongoose.model("Project", projectSchema);