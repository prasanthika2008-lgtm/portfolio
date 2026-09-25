const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Project = require("./models/Project");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });


// GET ALL PROJECTS
app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to get projects"
        });
    }
});


// ADD PROJECT
app.post("/api/projects", async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            technologies: req.body.technologies,
            github: req.body.github,
            live: req.body.live
        });

        const savedProject = await project.save();

        res.status(201).json(savedProject);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable to add project"
        });
    }
});


// CONTACT
app.post("/api/contact", (req, res) => {
    console.log("Contact message received:");
    console.log(req.body);

    res.json({
        message: "Message received successfully!"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});