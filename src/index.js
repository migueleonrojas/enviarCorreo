const express = require('express');
const bodyparser = require('body-parser');
const methodoverride = require('method-override');
const nodemailer = require('nodemailer');
const { Router } = require('express');


const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(methodoverride());
app.use(express.json( { limit: '50mb' } ));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(3000, () => {

    console.log('Servidor activo en el puerto 3000');

});


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "migueleonrojas@gmail.com", // generated ethereal user
      pass: "wdrphxkayblvcvgw", // generated ethereal password
    },
});

router.post('/enviarCorreoDeValidacion',  (req, res) => {

    let info = transporter.sendMail({
        from: `"${req.body.nombre} " <${req.body.correo}>`, // sender address
        to: `"Miguel Leon " <migueleonrojas@gmail.com>`, // list of receivers
        subject: `Origen:(Correo desde el portal). Asunto:(${req.body.asunto}). Correo proveniente de : (${req.body.correo})`, // Subject line
        text: `${req.body.mensaje}`, // plain text body
        html: `${req.body.mensaje}`, // html body
    }

    );

    res.send( { mensaje: "email enviado con exito"} );

    

});

router.post('/enviarCorreoPersonalizado',  (req, res) => {

    let info = transporter.sendMail({
        from: `"Miguel Leon" <migueleonrojas@gmail.com>`, // sender address
        to: `  "${req.body.nombre}" <${req.body.correo}>`, // list of receivers
        subject: `${req.body.asunto}`, // Subject line
        text: `${req.body.mensaje}`, // plain text body
        html: `${req.body.mensaje}`, // html body
    }

    );

    res.send( { mensaje: "email enviado con exito"} );

    

});


app.use(router);