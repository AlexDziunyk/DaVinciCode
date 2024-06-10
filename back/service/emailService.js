const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587, 
  secure: true, 
  auth: {
    user: '',  // вказати пошту для повідомлень, бо я не знаю де залутати її
    pass: '', // пароль, віповідно.
  },
});

const sendConfirmationEmail = async (email, confirmationToken) => {
  try {
    await transporter.sendMail({
      from: '', 
      to: email,
      subject: 'Registration Confirmation',
      html: `<p>To confirm your registration, please follow <a href="confirmation_link/${confirmationToken}">this link</a></p>`,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { transporter, sendConfirmationEmail };
