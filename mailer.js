var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var jade = require('jade');
var fn = jade.compileFile('./templates/stolenMotorCycleMail.jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport();

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Moto Help 👥" <foo@blurdybloop.com>', // sender address
    to: '', // list of receivers
    subject: 'Steal', // Subject line
    text: '', // plaintext body
    html: '' // html body
};
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});
app.post('/sendMail', function(req, res, next){
  //console.dir(req.body);
  //console.log(fn(req.body))
  if(req.body.vin != ""){
  req.body.vin = req.body.vin.substr(req.body.vin.length-4,req.body.vin.length-1)
}
  mailOptions.text = fn(req.body);
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
  res.send("1");
});
app.get('/alive', function(req, res, next){
  res.send("mailer alive");
})

http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port ' + "3000");
});
