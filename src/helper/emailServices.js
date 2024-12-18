const nodemailer = require("nodemailer");
const { compile } = require("handlebars");
const mjml2html = require("mjml");
const path = require("path");
const fs = require("fs");

/**
 * Represents an email service that can load templates, build, and send emails.
 */
class EmailService {
  /**
   * Constructs an instance of the EmailService, initializing template loaders and the email transporter.
   */
  constructor() {
    /**
     * Loads an email template from the filesystem.
     *
     * @param {string} templateName - The name of the template to load.
     * @returns {Function} A compiled template function that can be used to generate HTML email content.
     */
    this.loadTemplate = (templateName) => {
      const templatePath = path.join(
        __dirname,
        `../../constants/templates/${templateName}.mjml`
      );
      //console.log("path:", templatePath);
      const templateContent = fs.readFileSync(templatePath, "utf8");
      return compile(templateContent);
    };

    /**
     * A lookup object to access preloaded email templates.
     * @type {Object.<string, Function>}
     * TODO  Load less used templates in their respective functions
     */
    this.templateLookup = {
      timeOff: this.loadTemplate("timeoff"),
      offboarding: this.loadTemplate("offboarding"),
      onboarding: this.loadTemplate("onboarding"),
      offboardingSurveyInvitation: this.loadTemplate("offboarding_survey_invitation"),
      resetpassword: this.loadTemplate("password_reset"),
      newEmployeeActivation: this.loadTemplate("new_employee_activation"),
      satisfactionSurveyInvitation: this.loadTemplate("satisfaction_survey_invitation"),
    };

    /**
     * The email transporter used to send emails.
     * @type {Object}
     */
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Asynchronously builds and sends an email using a specified template and context.
   *
   * @param {string} template - The name of the template to use for the email body.
   * @param {Object} context - The data context to render the template with.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject of the email.
   * @returns {Promise<string>} A promise that resolves to the messageId of the sent email.
   */
  buildAndSendEmail = async (template, context, to, subject) => {
    const buildHtml = async (template, context) => {
      const mjml = this.templateLookup[template](context);
      const html = await mjml2html(mjml);
      return html.html;
    };

    const sendEmail = async (to, subject, html) => {
      const info = await this.transporter.sendMail({
        from: `BlueWave HRM support<${process.env.EMAIL}>`,
        to: to,
        subject: subject,
        html: html,
      });
      return info;
    };
    const info = await sendEmail(
      to,
      subject,
      await buildHtml(template, context)
    );
    return info.messageId;
  };
}

module.exports = EmailService;
