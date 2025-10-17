document.addEventListener('DOMContentLoaded', () => {

    let allProjects = []; // Store all projects for filtering

    // Function to render the bio content from bio.md
    async function renderBio() {
        const bioContentDiv = document.getElementById('bio-content');
        if (!bioContentDiv) return;

        try {
            const response = await fetch('bio.md');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let markdown = await response.text();

            // Simple Markdown to HTML conversion for headings and paragraphs
            // Convert ## Heading to <h2>Heading</h2>
            markdown = markdown.replace(/^## (.*)$/gm, '<h2>$1</h2>');
            // Convert plain text lines to paragraphs
            markdown = markdown.split('\n').map(line => {
                line = line.trim();
                if (line.startsWith('<h') || line === '') {
                    return line;
                } else {
                    return `<p>${line}</p>`;
                }
            }).join('\n');
            
            bioContentDiv.innerHTML = markdown;
        } catch (error) {
            console.error('Error loading or rendering bio.md:', error);
            bioContentDiv.innerHTML = '<p class="text-danger">Failed to load bio content.</p>';
        }
    }

    // Function to render skills content from skills.md
    async function renderSkills() {
        const skillsContentDiv = document.getElementById('skills-content');
        if (!skillsContentDiv) return;

        try {
            const response = await fetch('skills.md');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();

            let html = '';
            let inList = false;
            const lines = markdown.split('\n');

            lines.forEach(line => {
                line = line.trim();
                if (line.startsWith('### ')) {
                    if (inList) { html += '</ul>\n'; inList = false; }
                    html += `<h3>${line.substring(4)}</h3>\n`;
                } else if (line.startsWith('- ')) {
                    if (!inList) { html += '<ul>\n'; inList = true; }
                    html += `  <li>${line.substring(2)}</li>\n`;
                } else {
                    if (inList) { html += '</ul>\n'; inList = false; }
                    // Handle empty lines or other text if needed
                }
            });
            if (inList) { html += '</ul>\n'; } // Close any open list
            
            skillsContentDiv.innerHTML = html;
        } catch (error) {
            console.error('Error loading or rendering skills.md:', error);
            skillsContentDiv.innerHTML = '<p class="text-danger">Failed to load skills content.</p>';
        }
    }

    // Function to display projects in the table
    function displayProjects(projectsToDisplay) {
        const projectsTableBody = document.querySelector('#projects-table tbody');
        if (!projectsTableBody) return;

        projectsTableBody.innerHTML = ''; // Clear existing content

        if (projectsToDisplay.length === 0) {
            projectsTableBody.innerHTML = '<tr><td colspan="3">No matching projects found.</td></tr>';
            return;
        }

        projectsToDisplay.forEach(project => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${project.name}</td>
                <td>${project.description}</td>
                <td><a href="${project.url}" target="_blank" rel="noopener noreferrer">View Project</a></td>
            `;
            projectsTableBody.appendChild(row);
        });
    }

    // Function to render projects from projects.csv
    async function renderProjects() {
        try {
            const response = await fetch('projects.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const lines = csvText.trim().split('\n');

            if (lines.length < 2) {
                displayProjects([]); // No projects found
                return;
            }

            // Skip header row and process data rows
            allProjects = lines.slice(1).map(line => {
                const [name, description, url] = line.split(',');
                return { name: name.trim(), description: description.trim(), url: url.trim() };
            });

            displayProjects(allProjects);

        } catch (error) {
            console.error('Error loading or rendering projects.csv:', error);
            const projectsTableBody = document.querySelector('#projects-table tbody');
            if (projectsTableBody) {
                projectsTableBody.innerHTML = '<tr><td colspan="3" class="text-danger">Failed to load projects.</td></tr>';
            }
        }
    }

    // Function to filter projects based on input
    function filterProjects() {
        const searchTerm = document.getElementById('project-filter').value.toLowerCase();
        const filtered = allProjects.filter(project => {
            return project.name.toLowerCase().includes(searchTerm) ||
                   project.description.toLowerCase().includes(searchTerm);
        });
        displayProjects(filtered);
    }

    // Initialize functions
    renderBio();
    renderSkills();
    renderProjects();

    // Add event listener for project filtering
    const projectFilterInput = document.getElementById('project-filter');
    if (projectFilterInput) {
        projectFilterInput.addEventListener('input', filterProjects);
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
