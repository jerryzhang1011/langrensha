let user_data = require('../public/user_data');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
var express = require('express');
const { log } = require('console');
var router = express.Router();


router.post('/', (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + "/../public/images",
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        let file_url = files.file.newFilename;
        user_data.push({
            'name': fields.username,
            'img': file_url,
            'des': fields.description
        });
        res.render('index', { title: '抓变态', data: user_data });
    });
});

router.post('/reset', (req, res) => {
    user_data = [
      {
        'name': "jerry",
        'img': 'a.jpeg',
        'des': "Hello world"
      },
      {
          'name': "tom",
          'img': "b.jpeg",
          'des': "Hello"
      } 
    ]
    res.render('index', { title: '抓变态', data: user_data });
});


module.exports = router;