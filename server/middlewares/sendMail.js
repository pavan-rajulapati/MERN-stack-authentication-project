const nodemail = require('nodemailer')

const sendMail = async (to, subject, otp) => {
	try {
		const transport = nodemail.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: navy;">Your OTP</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Use the following OTP to complete your verification. The code is valid for 10 minutes:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #222; background: #f2f2f2; padding: 10px 20px; border-radius: 6px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #888;">If you didn’t request this, please ignore this email.</p>
          <p style="font-size: 14px; color: #888;">Thank you,<br/>From authentication team</p>
        </div>
      `;

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			html,
		};

		const info = await transport.sendMail(mailOptions);
		console.log('Email sent ✅', info.response);
	} catch (error) {
		console.log('Error at sending Email', error.message);
	}
};

module.exports = sendMail;
