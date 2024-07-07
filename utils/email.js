const nodemailer = require("nodemailer");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url = null, status = null) {
    (this.to = user.email),
      (this.firstName = user.firstName),
      (this.url = url),
      (this.from = "Crime Reporting <crs@mail.com>"),
      (this.status = status);
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // build html template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      status: this.status,
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async confirmEmail() {
    await this.send("sendConfirmEmail", "Email Verification");
  }

  async updateComplaint() {
    await this.send("sendUpdateComplaint", "Complaint Updated");
  }

  async deleteUser() {
    await this.send("sendDeleteUser", "Account Deletion");
  }

  async deleteComplaint() {
    await this.send("sendDeleteComplaint", "Complaint Deletion");
  }
};
