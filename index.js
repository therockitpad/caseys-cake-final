const express = require('express');
const nodeMailer = require('nodemailer');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Create a file named .env. And put
// EMAIL=emailid-of-account-to-use
// PASS=password-of-account-to-use
// Go to this link https://www.google.com/settings/security/lesssecureapps
// And flip the switch on
const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth    : {
        user : process.env.MAIL,
        pass : process.env.PASS
    }
});

app.post('/email', (req, res) => {
    try {
        const { from, to, subject, text } = req.body;
        if (!(from && to && subject && text)) {
            throw new Error('error');
        }
        const mailOptions = { from, to, subject, text };
        transporter.sendMail(mailOptions, (err, info) => {
            console.log({ err, info });
        });
    } catch (err) {
        res.status(400).send();
    }
});

app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`);
});
