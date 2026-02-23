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
  const contactLine = contactParts.join(" &bull; ");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: "Georgia", serif;
            padding: 60px 52px;
            color: #111827;
            font-size: 13px;
            line-height: 1.6;
            background: #ffffff;
          }

          /* Header */
          .resume-header {
            border-bottom: 2px solid #111827;
            padding-bottom: 20px;
            margin-bottom: 28px;
          }

          h1 {
            font-size: 28px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 12px;
            line-height: 1;
          }

          .contact {
            font-size: 11px;
            color: #4b5563;
            font-family: Arial, sans-serif;
          }

          /* Section */
          .section { margin-bottom: 24px; }

          h2 {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #111827;
            font-family: Arial, sans-serif;
            margin-bottom: 8px;
          }

          .divider {
            height: 1px;
            background: #e5e7eb;
            margin-bottom: 12px;
          }

          p {
            font-size: 13px;
            line-height: 1.65;
            color: #374151;
            white-space: pre-line;
          }

          /* Skills */
          ul.skills {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 6px 20px;
          }

          ul.skills li {
            font-size: 13px;
            color: #374151;
            padding-left: 12px;
            position: relative;
          }

          ul.skills li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #4f46e5;
            font-weight: 900;
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

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

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
