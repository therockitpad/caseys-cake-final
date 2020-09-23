const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const prepareEmailFields = require('./prepareEmailFields');

require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

const transporter = nodeMailer.createTransport({
    service : 'gmail',
    auth    : {
        user : process.env.MAIL,
        pass : process.env.PASS
    }
});

app.post('/', (req, res) => {
    console.log(req.body, prepareEmailFields);
    try {
        const { from, to, subject, text } = prepareEmailFields(req.body);
        if (!(from && to && subject && text)) {
            throw new Error('error');
        }
        const mailOptions = { from, to, subject, text };
        console.log(mailOptions);
        // transporter.sendMail(mailOptions, (err, info) => {
        //     console.log({ err, info });
        // });
        res.send(JSON.stringify(mailOptions));
    } catch (err) {
        console.log(err);
        res.send(JSON.stringify({ err }));
    }
});

app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`);
});
