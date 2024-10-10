let user_data = require('../public/user_data');
const formidable = require('formidable');
const path = require('path');
var express = require('express');
const { log } = require('console');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {});
});

router.post('/', (req, res) => {
  if (req.body.code === '8=D') {
    res.render('index', { title: '抓变态', data: user_data });
  } else {
    res.render('login', {});
  }
});

// router.get('/image/:imageName', (req, res) => {
//   const imageName = req.params.imageName;
//   res.sendFile(__dirname + "/" + imageName, (err) => {
//     if (err) {
//       console.error(err);
//       res.status(404).send('Image not found');
//     }
//   });
// });


module.exports = router;
