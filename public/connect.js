const { execFile, spawn, exec } = require('child_process');
const request = require('request');
const fs = require('fs');
const path = require('path');

var OVPPID = null;
var PLAYPID = null;

const cert = `${__dirname}\\win10\\ovp\\CERTIFICATE.ovpn`;
const ovpshel = `${__dirname}\\win10\\ovp\\openvpn.exe`;
const play = `${__dirname}\\win10\\play\\`; //RemotePlayPS4.exe

exports.Connect = function(win) {
  OVPPID = execFile(ovpshel, ['--config', cert], (error, stdout, stderr) => {

  });

  OVPPID.stdout.on('data', function(data) {
    if (data.split('Error')[1] !== undefined) {
      return console.log(data);
    }
    if (data.split('Sequence ')[1] !== undefined) {
      win.hide();
      PIDPLAY = exec(`cd ${play} && RemotePlayPS4.exe`, (err, stdout, stderr) => {
       OVPPID.kill();
        win.show();
      });
    }
  });
}

exports.Disconnect = function() {
  if (OVPPID.pid === null) {
    return console.log("No connection");
  }
  OVPPID.kill();
  console.log("Disconnect Succes");
}

// exports.Keyload = function (auth) {
//   const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4MDRlMDIyYjY0ODIyYWExNGUyZDYiLCJpYXQiOjE1MzU2NDk5ODksImV4cCI6MTUzODI0MTk4OX0.4rHxypuYXlgPPq2uKjH-cwGMUm4Fs9w_WUalrYNLEkc";
//   var CERTIFICATE = fs.createWriteStream(`${__dirname}\\win10\\ovp\\CERTIFICATE_V2.ovpn`);
//     request({
//         url: `http://162.247.13.110:3232/getovpkey`,
//         method: "GET",
//         headers: {
//           'Authorization': auth
//         },
//       },function(err, httpResponse, body) {
//         if (err) {
//           return console.log(err);
//         }
//     }).pipe(CERTIFICATE);
// }
