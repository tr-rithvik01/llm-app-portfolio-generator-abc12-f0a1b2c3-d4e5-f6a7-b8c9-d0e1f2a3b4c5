# My Portfolio

## 1. Project Title and Description

This is a simple, single-page personal portfolio web application designed to showcase a developer's profile, bio, and projects. It uses Bootstrap for styling, making it responsive and visually appealing. The application dynamically loads the bio content from a Markdown file (`bio.md`) and project details from a CSV file (`projects.csv`), demonstrating basic front-end data handling.

## 2. Setup Instructions

To run this application locally, follow these steps:

1.  **Save the files:** Download all the provided files (`index.html`, `script.js`, `bio.md`, `projects.csv`, `profile.webp`) into a single directory on your computer.
2.  **Ensure `profile.webp` exists:** Make sure the `profile.webp` image file is present in the same directory as `index.html`. If you don't have it, you can use any placeholder image and rename it to `profile.webp` or update the `src` attribute in `index.html` accordingly.
3.  **Open `index.html`:** Simply open the `index.html` file in your web browser. You can do this by double-clicking the file or by right-clicking and choosing "Open with..." your preferred browser.

No build tools or server-side setup are required as this is a purely client-side application.

## 3. Usage Guide

Upon opening `index.html` in your browser:

*   You will see the main title "My Portfolio" at the top.
*   A profile image (`profile.webp`) will be displayed centrally.
*   The "About Me" section will automatically load and render the content from `bio.md`, displaying it as formatted HTML.
*   The "My Projects" section will display a table populated with data from `projects.csv`. Each row represents a project, showing its name, description, and a clickable link to its URL.

This portfolio is designed for static viewing and does not have any interactive elements beyond navigation links to external project URLs.

## 4. Code Explanation

The application consists of the following files:

*   `index.html`: The main HTML file that structures the portfolio page. It includes:
    *   Bootstrap 5 CSS for responsive design and styling.
    *   A header with the main title.
    *   An `<img>` tag for the `profile.webp` image.
    *   A `<div id="bio-content">` where the `bio.md` content will be rendered.
    *   A `<table id="projects-table">` where the `projects.csv` data will be displayed.
    *   Links to Bootstrap 5 JavaScript bundle and `script.js` for dynamic content loading.
    *   A simple footer.

*   `script.js`: Contains the JavaScript logic for dynamic content loading:
    *   `renderBio()`: Fetches `bio.md`, performs a basic Markdown-to-HTML conversion (specifically for `##` headings and treating lines as paragraphs), and inserts the resulting HTML into the `#bio-content` div.
    *   `renderProjects()`: Fetches `projects.csv`, parses the CSV data, and dynamically creates table rows (`<tr>`) and data cells (`<td>`) within the `#projects-table tbody`. Project URLs are rendered as clickable links.
    *   Both functions are called on `DOMContentLoaded` to ensure the HTML structure is ready.
    *   It also dynamically sets the current year in the footer.

*   `bio.md`: A Markdown file containing the "About Me" section's text content. The JavaScript converts its Markdown syntax to HTML.

*   `projects.csv`: A Comma Separated Values file listing projects with `name`, `description`, and `url` columns. The JavaScript parses this to populate the projects table.

*   `profile.webp`: The profile picture image file, referenced directly in `index.html`.

## 5. License Information

This project is open source and available under the MIT License.

```
MIT License

Copyright (c) [Year] [Your Name/Project Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
