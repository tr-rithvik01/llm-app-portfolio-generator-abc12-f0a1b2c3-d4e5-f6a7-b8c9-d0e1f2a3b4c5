# My Portfolio

## 1. Project Title and Description

This is a simple, single-page personal portfolio web application designed to showcase a developer's profile, bio, technical skills, and projects. It uses Bootstrap for styling, making it responsive and visually appealing. The application dynamically loads the bio content from `bio.md`, technical skills from `skills.md`, and project details from a CSV file (`projects.csv`). A key new feature is the real-time project filtering, allowing users to quickly find specific projects by name or description.

## 2. Setup Instructions

To run this application locally, follow these steps:

1.  **Save the files:** Download all the provided files (`index.html`, `script.js`, `bio.md`, `skills.md`, `projects.csv`, `profile.webp`) into a single directory on your computer.
2.  **Ensure `profile.webp` exists:** Make sure the `profile.webp` image file is present in the same directory as `index.html`. If you don't have it, you can use any placeholder image and rename it to `profile.webp` or update the `src` attribute in `index.html` accordingly.
3.  **Open `index.html`:** Simply open the `index.html` file in your web browser. You can do this by double-clicking the file or by right-clicking and choosing "Open with..." your preferred browser.

No build tools or server-side setup are required as this is a purely client-side application.

## 3. Usage Guide

Upon opening `index.html` in your browser:

*   You will see the main title "My Portfolio" at the top.
*   A profile image (`profile.webp`) will be displayed centrally.
*   The "About Me" section will automatically load and render the content from `bio.md`, displaying it as formatted HTML.
*   A new "Technical Skills" section will display skills fetched and formatted from `skills.md`.
*   The "My Projects" section will display a table populated with data from `projects.csv`. Each row represents a project, showing its name, description, and a clickable link to its URL.
*   **Project Filtering:** Above the projects table, there is a text input field (`id="project-filter"`). As you type into this field, the projects table will filter in real-time. The filter is case-insensitive and searches both the project's name and its description.

## 4. Code Explanation

The application consists of the following files:

*   `index.html`: The main HTML file that structures the portfolio page. It includes:
    *   Bootstrap 5 CSS for responsive design and styling.
    *   A header with the main title.
    *   An `<img>` tag for the `profile.webp` image.
    *   A `<div id="bio-content">` where the `bio.md` content will be rendered.
    *   A new `<div id="skills-content">` where the `skills.md` content will be rendered.
    *   A new `<input type="text" id="project-filter">` for real-time project filtering.
    *   A `<table id="projects-table">` where the `projects.csv` data will be displayed.
    *   Links to Bootstrap 5 JavaScript bundle and `script.js` for dynamic content loading.
    *   A simple footer.

*   `script.js`: Contains the JavaScript logic for dynamic content loading and interactivity:
    *   `allProjects`: A global array to store all project data loaded from `projects.csv`.
    *   `renderBio()`: Fetches `bio.md`, performs a basic Markdown-to-HTML conversion (specifically for `##` headings and treating lines as paragraphs), and inserts the resulting HTML into the `#bio-content` div.
    *   `renderSkills()`: **New function.** Fetches `skills.md`, converts `###` headings to `<h3>` and `-` list items into `<li>` elements within a `<ul>`, and inserts the HTML into the `#skills-content` div.
    *   `renderProjects()`: Fetches `projects.csv`, parses the CSV data, stores it in `allProjects`, and then calls `displayProjects()` to initially render the table.
    *   `displayProjects(projectsToDisplay)`: **New function.** Takes an array of project objects and dynamically creates table rows (`<tr>`) and data cells (`<td>`) within the `#projects-table tbody`, rendering project URLs as clickable links.
    *   `filterProjects()`: **New function.** Triggered by the `input` event on `#project-filter`. It gets the search term, converts it to lowercase, filters the `allProjects` array (matching against `name` and `description`), and then calls `displayProjects()` with the filtered results.
    *   All content rendering functions (`renderBio`, `renderSkills`, `renderProjects`) are called on `DOMContentLoaded`.
    *   It also dynamically sets the current year in the footer.

*   `bio.md`: A Markdown file containing the "About Me" section's text content. The JavaScript converts its Markdown syntax to HTML.

*   `skills.md`: **New file.** A Markdown file containing the "Technical Skills" section's text content, formatted with `###` for headings and `-` for list items.

*   `projects.csv`: A Comma Separated Values file listing projects with `name`, `description`, and `url` columns. The JavaScript parses this to populate and filter the projects table.

*   `profile.webp`: The profile picture image file, referenced directly in `index.html`.

## 5. License Information

This project is open source and available under the MIT License.
