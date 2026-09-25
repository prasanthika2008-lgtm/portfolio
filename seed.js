const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Project = require("./models/Project");

dotenv.config();

const projects = [
    {
        title: "ExpiryWise",
        description: "A smart food expiry tracking and food waste reduction system.",
        technologies: "HTML, CSS, JavaScript, Python Flask, SQLite",
        github: "https://github.com/prasanthika2008-lgtm/ExpiryWise.git",
        live: ""
    },
    {
        title: "LearnPath AI",
        description: "A personalized learning platform that helps students identify skill gaps and follow a structured learning path.",
        technologies: "HTML, CSS, JavaScript, Node.js, Express, MongoDB",
        github: "",
        live: ""
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected");

        await Project.deleteMany();

        await Project.insertMany(projects);

        console.log("Projects added successfully");

        await mongoose.connection.close();

        console.log("Database connection closed");
    } catch (error) {
        console.log("Error:", error.message);
    }
}

seedDatabase();