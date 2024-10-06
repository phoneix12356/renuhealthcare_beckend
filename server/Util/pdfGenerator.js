import fs from 'fs';
import PDFDocument from 'pdfkit';
import Certificate from '../models/Certificate.js';

const generateCertificate = async (name, email,userId,post) => {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];
        const certificatePath = `Certificates/${name}_certificate.pdf`; // Adjust the folder path as needed
        const writeStream = fs.createWriteStream(certificatePath);

    // Pipe the PDF document to buffers array
    doc.on("data", buffers.push.bind(buffers));

    // Pipe the PDF document to write stream to save locally
    doc.pipe(writeStream);

    const backgroundImagePath = 'images/logo-image.png';

    const backgroundImage = fs.readFileSync(backgroundImagePath);

    // Define the upper margin
    const upperMargin = 60; // Adjust as needed
    
    // Draw the background image with the upper margin
    doc.image(backgroundImage, 0, upperMargin, { width: doc.page.width+2, height: doc.page.height - 210, opacity: 0.8 });
    doc.font("Helvetica");

    doc
      .fontSize(20)
      .fillColor("green")
      .font("Helvetica-Bold")
      .text("Renu Sharma Healthcare Education & Foundation", { align: "left" });
    doc.moveDown();

    doc
      .fontSize(12)
      .font("Helvetica").fillColor("black")
      .text("Gurugram, Haryana", { align: "left" });
    doc.fontSize(12).font("Helvetica").fillColor("black")
    .text("Sector - 14", { align: "left" });
    doc
      .fontSize(12).fillColor("black")
      .font("Helvetica")
      .text("Pincode: 122503", { align: "left" });
    doc
      .fontSize(12)
      .fillColor("black")
      .font("Helvetica")
      .fontSize(12)
      .moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });
    doc.moveDown();
    doc.text(`Subject: Offer letter of ${post}`, { align: "left" });
    doc.moveDown();

    doc.text(`Dear ${name},`, { align: "left" });
    doc.moveDown();

    doc.text(
      `We are thrilled to extend an offer of employment for the position of ${post} intern at Renu Sharma Healthcare Education & Foundation. We were impressed by your qualifications and experience, and we believe that you will make a valuable addition to our team.`,
      { align: "left" }
    );
    doc.moveDown();

    doc
      .text(
        `To accept this offer, please sign and return this letter by 3 days from now. If you have any questions or concerns, please do not hesitate to contact us at `,
        { continued: true }
      )
      .font("Helvetica-Bold")
      .text("9671457366", { continued: true })
      .font("Helvetica")
      .text(" or ", { continued: true })
      .font("Helvetica-Bold")
      .text("Neha.rshefoundation@gmail.com");

    doc
      .fontSize(12)
      .fillColor("black")
      .font("Helvetica")
      .fontSize(12)
      .moveDown();

    doc.text(
      "We are excited about the possibility of you joining our team and look forward to your positive response.",
      { align: "left" }
    );
    doc.moveDown();

    doc.text("Congratulations!", { align: "left" });

    doc.moveDown();

    doc.text(`Name - ${name}`, { align: "left" });

    //  line width and stroke color for the border
    doc.lineWidth(25);
    doc.strokeColor("#000080");

   
    // Draw the border line at the bottom of the page
    doc
      .moveTo(0, doc.page.height - 50)
      .lineTo(doc.page.width, doc.page.height - 50)
      .stroke();

 
   
   

    doc.end();

    writeStream.on("finish", async () => {
      console.log(
        `Certificate generated and stored locally at: ${certificatePath}`
      );

      // Read the generated PDF file as a buffer
      const pdfBuffer = fs.readFileSync(certificatePath);

            try {
                // Create a new certificate document in the database
                const certificate = new Certificate({
                    userId,
                    name,
                    post,
                
                    content: `This is to certify that ${name} successfully completed the internship program.`,
                    pdfBuffer, // Store the PDF buffer
                });
                await certificate.save()
                console.log(`Certificate stored in the database for ${email}`);
                resolve({ path: certificatePath, buffer: Buffer.concat(buffers) }); // Resolve with the path to the saved PDF file and the PDF buffer
            } catch (error) {
                console.error(`Error storing certificate in the database: ${error.message}`);
                reject(error);
            }
        });

    writeStream.on("error", (error) => {
      console.error(`Error generating certificate: ${error.message}`);
      reject(error);
    });
  });
};

export default generateCertificate;
