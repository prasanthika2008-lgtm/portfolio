const projectContainer = document.getElementById("project-container");

async function loadProjects() {
    try {
        const response = await fetch("/api/projects");
        const projects = await response.json();

        projectContainer.innerHTML = "";

        if (projects.length === 0) {
            projectContainer.innerHTML = "<p>No projects added yet.</p>";
            return;
        }

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
             <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies}</p>
                ${
                    project.github
                        ? `<a href="${project.github}" target="_blank">View on GitHub</a>`
                        : ""
                }
            `;

            projectContainer.appendChild(card);
        });

    } catch (error) {
        projectContainer.innerHTML =
            "<p>Unable to load projects.</p>";
    }
}


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/api/contact", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const data = await response.json();

        document.getElementById("responseMessage").textContent =
            data.message;

        contactForm.reset();

    } catch (error) {
        document.getElementById("responseMessage").textContent =
            "Something went wrong.";
    }
});


loadProjects();