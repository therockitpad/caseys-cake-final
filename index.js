const express = require('express');
const nodeMailer = require('nodemailer');
const prepareEmailFields = require('./prepareEmailFields');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth    : {
        user : process.env.MAIL,
        pass : process.env.PASS
    }
});

app.post('/', (req, res) => {
    console.log(req.body);
    try {
        const mailOptions = prepareEmailFields(req.body);
        console.log(mailOptions);
        transporter.sendMail(mailOptions, (err, info) => {
            console.log({ err, info });
        });
        console.log(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.send(500);
    }
});

app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`);
});
