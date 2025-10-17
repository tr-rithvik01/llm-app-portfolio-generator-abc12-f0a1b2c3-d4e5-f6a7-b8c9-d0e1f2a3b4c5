document.addEventListener('DOMContentLoaded', () => {

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

    // Function to render projects from projects.csv
    async function renderProjects() {
        const projectsTableBody = document.querySelector('#projects-table tbody');
        if (!projectsTableBody) return;

        try {
            const response = await fetch('projects.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const lines = csvText.trim().split('\n');

            if (lines.length < 2) {
                projectsTableBody.innerHTML = '<tr><td colspan="3">No projects found.</td></tr>';
                return;
            }

            // Skip header row and process data rows
            const projects = lines.slice(1).map(line => {
                const [name, description, url] = line.split(',');
                return { name: name.trim(), description: description.trim(), url: url.trim() };
            });

            projectsTableBody.innerHTML = ''; // Clear existing content

            projects.forEach(project => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.description}</td>
                    <td><a href="${project.url}" target="_blank" rel="noopener noreferrer">View Project</a></td>
                `;
                projectsTableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error loading or rendering projects.csv:', error);
            projectsTableBody.innerHTML = '<tr><td colspan="3" class="text-danger">Failed to load projects.</td></tr>';
        }
    }

    // Initialize functions
    renderBio();
    renderProjects();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
