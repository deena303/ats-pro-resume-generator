const puppeteer = require("puppeteer");

async function generateResumePDF(resumeData) {
  const {
    fullName = "",
    email = "",
    phone = "",
    linkedin = "",
    github = "",
    summary = "",
    skills = "",
    experience = "",
    education = "",
  } = resumeData;

  // Build skills as bullet points
  const skillList = skills
    ? skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => `<li>${s}</li>`)
      .join("")
    : "<li>—</li>";

  // Build contact line
  const contactParts = [email, phone, linkedin, github].filter(Boolean);
  const contactLine = contactParts.join(" &nbsp;|&nbsp; ");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: "Segoe UI", Arial, sans-serif;
            padding: 48px 52px;
            color: #1a1a2e;
            font-size: 13px;
            line-height: 1.6;
          }

          /* Header */
          .resume-header {
            border-bottom: 2.5px solid #1e293b;
            padding-bottom: 14px;
            margin-bottom: 22px;
          }

          h1 {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #0f172a;
            margin-bottom: 8px;
          }

          .contact {
            font-size: 11.5px;
            color: #334155;
          }

          /* Section */
          .section { margin-bottom: 20px; }

          h2 {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: #1e293b;
            font-family: "Segoe UI", Arial, sans-serif;
            margin-bottom: 5px;
          }

          .divider {
            height: 1.5px;
            background: #e2e8f0;
            margin-bottom: 9px;
          }

          p {
            font-size: 13px;
            line-height: 1.65;
            color: #334155;
            white-space: pre-line;
          }

          /* Skills */
          ul.skills {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 4px 18px;
          }

          ul.skills li {
            font-size: 12.5px;
            color: #334155;
            padding-left: 13px;
            position: relative;
          }

          ul.skills li::before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #6366f1;
            font-size: 10px;
            top: 2px;
          }
        </style>
      </head>
      <body>
        <div class="resume-header">
          ${fullName ? `<h1>${fullName}</h1>` : ""}
          ${contactLine ? `<div class="contact">${contactLine}</div>` : ""}
        </div>

        ${summary
      ? `<div class="section">
                <h2>Professional Summary</h2>
                <div class="divider"></div>
                <p>${summary}</p>
               </div>`
      : ""
    }

        ${skills
      ? `<div class="section">
                <h2>Skills</h2>
                <div class="divider"></div>
                <ul class="skills">${skillList}</ul>
               </div>`
      : ""
    }

        ${experience
      ? `<div class="section">
                <h2>Experience</h2>
                <div class="divider"></div>
                <p>${experience}</p>
               </div>`
      : ""
    }

        ${education
      ? `<div class="section">
                <h2>Education</h2>
                <div class="divider"></div>
                <p>${education}</p>
               </div>`
      : ""
    }
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = { generateResumePDF };
