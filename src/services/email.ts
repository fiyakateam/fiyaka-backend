import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendCreationEmail = function (
  target: string,
  heading: string,
  body: string
) {
  sgMail.send({
    to: target,
    from: process.env.EMAIL_SOURCE as string,
    subject: heading,
    text: body,
  });
};

export default sendCreationEmail;
