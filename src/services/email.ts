import sgMail from '@sendgrid/mail';
import { sendGridApiKey, emailSource } from '../configToShow/env';

sgMail.setApiKey(sendGridApiKey);

const sendCreationEmail = async function (
  target: string,
  heading: string,
  body: string
): Promise<void> {
  try {
    await sgMail.send({
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
