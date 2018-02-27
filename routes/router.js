var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var nodemailer = require('nodemailer')
require('../public/passport')(passport);
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var User = require('../public/schema/UserSchema');


//////////////////////////
/// Section principale ///
//////////////////////////
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Portfolio - Roussel Pierre - Accueil',
        accueil: true
    });
});

router.get('/creations', function (req, res, next) {
    res.render('templates/creations', {
        title: 'Portfolio - Roussel Pierre - Mes créations',
        creations: true
    });
});

router.get('/faq', function (req, res, next) {
    res.render('templates/faq', {
        title: 'Portfolio - Roussel Pierre - FAQ',
        faq: true
    });
});

//////////////////////////
/// Section contact //////
//////////////////////////
router.get('/contact', function (req, res, next) {
    res.render('templates/contact', {
        title: 'Portfolio - Roussel Pierre - Me contacter',
        contact: true,
        success: req.session.success
    });
    req.session.success = false
});

router.post('/contact-form', function (req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
            user: 'drakeyras62@gmail.com',
            pass: ':o:qnTu^@^))'
        }
    });
    var mailOptions = {
        from: 'drakeyras62@gmail.com',
        to: 'pierre.roussel1@epsi.fr',
        subject: 'Message portfolio de ' + req.body.name,
        html: '<b>mail: </b>' + req.body.email + '<br><b>De: </b>' + req.body.name + '<br><b>Message: </b>' + req.body.texte
    };

    req.check('name', 'Le champ nom est vide').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        req.body.formcontact.prevent_default;
    } else {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error + 'oupsi');
                res.redirect('/contact');
            } else {
                console.log('Email sent:' + info.response);
                res.redirect('/contact');
            }
        })
    }
    req.session.success = true;
})

//////////////////////////
///  Si url inconnue  ////
//////////////////////////
router.get('/*', function (req, res, next) {
    res.render('E404', {
        title: 'Page Introuvable',
        message: 'Vous vous êtes perdu ? Pas de soucis ! Retournez à la page d\'accueil'
    });
});

module.exports = router;
