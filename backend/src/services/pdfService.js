const puppeteer = require("puppeteer");

async function generateResumePDF(resumeData) {
  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { margin-bottom: 5px; }
          h2 { margin-top: 30px; }
          p { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>${resumeData.name}</h1>
        <p>${resumeData.email}</p>

        <h2>Skills</h2>
        <p>${resumeData.skills}</p>

        <h2>Experience</h2>
        <p>${resumeData.experience}</p>
      </body>
    </html>
  `;

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
}

module.exports = { generateResumePDF };
