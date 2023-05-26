const cron = require('node-cron');
const moment = require('moment');
const http = require('http');
const cookieParser = require('cookie-parser');
const firebaseAdmin = require("./firebase-admin").getAdmin();
const express = require('express');
const Security = require('./security');

let teleX = require('./telegram-integration');
let arrUserTask = []

//config
const maxRetry = 3;
const minHour = 6;
const maxHour = 23;
const generateScheduleHour = 7;
const generateScheduleDay = "THURSDAY";
const maxSkipCount = 3;
const days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];
const secretKey = 'c3efc24a44e6ede4b8494fafa7d3b0b42aa65eb71526939c8df15753aa887060';
const vector = '61ec48a93ece9d1d9bc9ed697b7b04a7';

const secretKeyBuff = Security.stringToBuffer(secretKey);
const vectorBuff = Security.stringToBuffer(vector);
const firebaseRef = firebaseAdmin.database().ref("artemisUsers");

const app = express();

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getNewTimer = (arrMin) => {
  let random_index = getRandomInt(arrMin.length -1);
  return arrMin[random_index];
}

function sleep(second) {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000);
  });
}

function getRandomNum(min, max, takenNum = [] ){
  let randomNum = Math.floor(Math.random() * (max - min ) + min );
  if(takenNum.includes(randomNum)){
    return getRandomNum(min, max, takenNum)
  } else {
    return randomNum;
  }
}

function generateSkipConfig(usersData){
  for(let i = 0; i < usersData.length; i ++ ){
    let skipConfig = [];
    for ( let j = 0 ; j < days.length ; j++ ){
      let maxSkip = getRandomNum(1,maxSkipCount);
      let skippedHours = [];
      for (let k = 0; k < maxSkip; k++){
        let randomHour = getRandomNum(minHour,maxHour);
        skippedHours.push(randomHour);
      }
      let skip = { day: days[j], skippedHours: skippedHours};
      skipConfig.push(skip);
    }
    usersData[i].skipConfig = skipConfig;
  }
  return usersData;
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function isEmpty(variable) {
  if (variable == null || variable === '') {
    return true;
  }
  if (variable instanceof Object) {
    return Object.keys(variable).length == 0;
  }
  return false;
}

function validateStellarAddress(stellarAddress){
  let result = "OK";
  if(!isEmpty(stellarAddress)){
      if(stellarAddress.length != 56){
          result = "Invalid Stellar Address. Address length must 56 character!"
          return result
      }else{
          if(stellarAddress.charAt(0).toUpperCase() != "G"){
              result = "Invalid Stellar Address. Address Started with G!"
          }
      }
  }else{
      result = "Stellar Address is mandatory!"
  }

  return result
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '5000');
app.set('port', (port));
app.server = http.createServer(app);
app.server.setTimeout(420000);

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  app.server.close(() => {
    console.log('Http server closed.');
  });
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});

app.get("/demo-msg",async function(req,resp){
  let msg = `Demo test notif https://www.cyclic.sh`
  teleX.sendMessage({message: `${msg}`});

  return resp.send({success: true, message: "OK"});
});

app.get('/', function(request, response) {
  let result = {
    success: true,
    message: "App is running!"
  };
  response.send(result);
});

// app.listen(app.get('port'), function() {
//   console.log('App is running, server is listening on port ', app.get('port'));
// });
app.server.listen(port);


