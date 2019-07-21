var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();





app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send('hi')
    console.log('animesh')
})
app.post('/mail/api', (req, res) => {
    console.log(req)
    console.log(res)
    var output = `
    <h3>you have a new contact request</h3>
    <h4>contact details</h4>
    <ul>
        <li>Name: ${res.body.name}</li>
        <li>Email: ${res.body.email}</li>
        <li>Message: ${res.body.message}</li>
    </ul>`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'animeshpaul333@gmail.com',
            pass: 'anime@123',
        }
    });
    
    let mailOptions = {
        from: 'animeshpaul333@gmail.com',
        to: 'animeshpaul.unofficial@gmail.com',
        subject: 'Contact Mail from truedesigner.com',
        text: output,
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Email sent', data)
        }
    })
    
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`your mail app is running on ${PORT}`)
})
