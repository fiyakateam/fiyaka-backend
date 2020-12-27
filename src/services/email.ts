import sgMail from '@sendgrid/mail';
import { sendGridApiKey, emailSource } from '../configToShow/env';

sgMail.setApiKey(sendGridApiKey);

const sendCreationEmail = function (
  target: string,
  heading: string,
  body: string
): void {
  try {
    sgMail.send({
      to: target,
      from: emailSource,
      subject: heading,
      text: body,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default sendCreationEmail;
