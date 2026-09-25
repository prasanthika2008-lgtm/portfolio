const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Project = require("./models/Project");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Unable to get projects"
        });
    }
});

app.post("/api/projects", async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            technologies: req.body.technologies,
            github: req.body.github
        });

        const savedProject = await project.save();

        res.status(201).json(savedProject);

    } catch (error) {
        res.status(500).json({
            message: "Unable to add project"
        });
    }
});

app.post("/api/contact", (req, res) => {
    console.log("Contact message received:");
    console.log(req.body);

    res.json({
        message: "Message received successfully!"
    });
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;