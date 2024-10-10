const { log } = require('debug/src/browser');
var express = require('express');
var router = express.Router();


let langren = 0;
let yuyanjia = 0;
let pingming = 0;
let nvwu = 0;
let lieren = 0;
let shouwei = 0;
let li = [];
let userIPs = {};
let setGame = false

function init() {
  langren = 0;
  yuyanjia = 0;
  pingming = 0;
  nvwu = 0;
  lieren = 0;
  shouwei = 0;
  li = [];
  userIPs = {};
  return;
}


function is_empty(li) {
  for(let i = 0; i < l1.length; i++) {
    if (li[i] != 0) {
      return false
    }
  }
  return true;
}

router.get('/', function(req, res, next) {
  if (setGame == false) {
    setGame = true;
    res.redirect('/setting');
    return;
  }
  const clientIp = req.headers['x-forwarded-for'] || req.ip;
  res.render('langrensha', {role: userIPs[clientIp], repeatedReq: false});
});

router.post('/setting', function(req, res, next) {  
  langren =  req.body.langren;
  yuyanjia =  req.body.yuyanjia;
  pingming =  req.body.pingming;
  nvwu =  req.body.nvwu;
  lieren = req.body.lieren;
  shouwei =  req.body.shouwei;

  if (isNaN(langren) || isNaN(yuyanjia) || isNaN(pingming) || isNaN(nvwu) || isNaN(lieren) || isNaN(shouwei)) {
    res.redirect('/setting');
    return;
  }

  langren = Number(langren);
  yuyanjia = Number(yuyanjia);
  pingming = Number(pingming);
  nvwu = Number(nvwu);
  lieren = Number(lieren);
  shouwei = Number(shouwei);

  li = [
        ['狼人', langren], 
        ['预言家', yuyanjia], 
        ['平民', pingming], 
        ['女巫', nvwu], 
        ['猎人', lieren],
        ['守卫', shouwei]
      ];

  res.render('langrensha', {role: 'None', repeatedReq: false}, );
});

// go to setting page
router.get('/setting', function(req, res, next) {
  const referer = req.get('Referer');
  if (referer && referer.includes('/settingLogin')) {
    init();
    res.render('langrenshaSetting', {});
  } else {
    res.redirect('/settingLogin');
  }
});

router.get('/getrole', function(req, res, next) {
  const clientIp = req.headers['x-forwarded-for'] || req.ip;

  if (clientIp in userIPs) {
    res.render('langrensha', { role: userIPs[clientIp], ip: clientIp, repeatedReq: true });
    return;
  }

  li = li.filter(item => {
    if (item[1] !== 0) {
      return true;
    }
    return false;
  });

  if (li.length === 0) {
    res.render('langrensha', { role: 'None' , repeatedReq: false});
    return; 
  }

  const min = 0;
  const max = li.length;
  const randomInt = Math.floor(Math.random() * (max - min));
  li[randomInt][1] = li[randomInt][1] - 1;
  userIPs[clientIp] = li[randomInt][0];
  res.render('langrensha', { role: li[randomInt][0], ip: clientIp, repeatedReq: false});
  return;
});


router.get('/shangdi', function(req, res, next) {
  res.render('shangdi', {role: li.length, repeatedReq: false});
});

router.get('/settingLogin', function(req, res, next) {
  res.render('settingLogin');
});

router.post('/settingLogin', function(req, res, next) {
  password = req.body.password;
  if (password === "123") {
    res.redirect('/setting');
    return;
  }
  const clientIp = req.headers['x-forwarded-for'] || req.ip;
  res.render('langrensha', { role: userIPs[clientIp], ip: clientIp, repeatedReq: true });
});

module.exports = router;
