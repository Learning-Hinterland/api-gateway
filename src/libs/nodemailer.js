const {
    REFRESH_TOKEN,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
} = process.env;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

async function sendMail(name, email, url) {
    try {
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'magdalenapardosi4@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        });

        const mailOptions = {
            from: '"Learning Hinterland 👩🏻‍🎓" <magdalenapardosi4@gmail.com>',
            to: email,
            subject: 'Reset your password',
            // html reset your 
            html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 500px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                border-radius: 10px;
                                padding: 20px;
                                text-align: center;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                font-size: 24px;
                                color: #007BFF;
                                margin-bottom: 20px;
                            }
                            .content {
                                font-size: 16px;
                                color: #333333;
                                margin-bottom: 20px;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007BFF;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                                margin-top: 20px;
                            }
                            .footer {
                                font-size: 14px;
                                color: #777777;
                                margin-top: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                🔐 Password Reset
                            </div>
                            <div class="content">
                                <p>Hi ${name},</p>
                                <p>We received a request to reset your password. Click the button below to reset it:</p>
                                <a href="${url}" class="button">Reset Password</a>
                                <p>If you didn't request this, please ignore this email.</p>
                                <p>😊 Stay safe!</p>
                            </div>
                            <div class="footer">
                                &copy; 2024 Learning Hinterland. All rights reserved.
                            </div>
                        </div>
                    </body>
                    </html>`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

module.exports = sendMail;
