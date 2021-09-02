const express = require('express');
const path = require("path");
const app = express();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost:27017/contactfio', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

//define mongoose schema.
var contactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    based: String,
    number: Number,
    mail: String,
    maternity: String,
    newborn: String,
    infant: String,
    sitter: String,
    cakesmash: String,
    toddler: String,
    family: String,
    msg: String,
    date: String,
    how: String
    
});

var Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff.


app.use('/static', express.static('static')) //for serving static files.
app.use('/images', express.static('images')) //for serving the images. By default, express won't display them!

//Pug specific stuff

app.set('view engine', 'pug') //set the template engine as pug.
app.set('views', path.join(__dirname, 'views')) //set the views directorty.
app.use(express.json());
app.use(express.urlencoded({extended:false})); //to display the incoming data.

//Endpoints.
app.get('/', (req, res) => {
    res.status(200).render('fio.pug') //status 200 just means that everything went well.

})

app.get('/mywork', (req, res) => {
    res.status(200).render('mywork.pug')
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug')
})

app.get('/blog', (req, res) => {
    res.status(200).render('blog.pug')
})

app.get('/reviews', (req, res) => {
    res.status(200).render('reviews.pug')
})

app.get('/about', (req, res) => {
    res.status(200).render('about.pug')
})



//post request on the contact.
app.post('/contact', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
        <li>First Name: ${req.body.fname}</li>
        <li>Last Name: ${req.body.lname}</li>
        <li>Based out of: ${req.body.based}</li>
        <li>Number: ${req.body.number}</li>
        <li>Email: ${req.body.mail}</li>
        <li>Maternity: ${req.body.maternity}</li>
        <li>Newborn: ${req.body.newborn}</li>
        <li>Infant: ${req.body.infant}</li>
        <li>Sitter: ${req.body.sitter}</li>
        <li>Cakesmash: ${req.body.cakesmash}</li>
        <li>Toddler: ${req.body.toddler}</li>
        <li>Family: ${req.body.family}</li>
        <li>Message: ${req.body.msg}</li>
        <li>Date: ${req.body.date}</li>
        <li>How did they hear about you: ${req.body.how}</li>
    </ul>
    <h3>In case of any query contact: 9872338310</h3>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'prateekgandhi718@gmail.com', // generated ethereal user
          pass: 'Prateek718$', // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Prateek Gandhi for Frame it out" <prateekgandhi718@gmail.com>', // sender address
        to: 'prateekgandhii718@gmail.com', // list of receivers
        subject: "Hi, you have a new client.", // Subject line
        text: "Here are the details.", // plain text body
        html: output // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    




    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.render("thanks.pug")
        // alert("Form has been sumbitted successfully.")
    }).catch(() => {
        res.status(400).send("item was not saved to the database, sorry about that. You could reload the page again.")
    });
})
    


    //Start the server
    app.listen(port, () => {
        console.log(`The application started successfully on port ${port}`);
    });