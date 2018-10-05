const { execFile, spawn, exec } = require('child_process');
const request = require('request');
const fs = require('fs');
const path = require('path');
const os = require('os');

var OVPPID = null;
var PLAYPID = null;
var PLAYCHID = null;
var Win;


var MainDir = process.cwd();

const cert = `${MainDir}\\win10\\ovp\\CERTIFICATE.ovpn`;
const ovp = `${MainDir}\\win10\\ovp\\openvpn.exe`;
const play = `${MainDir}\\win10\\play`;

module.exports = {
  Connect: (win) => {
    Win = win;
    const prc = execFile(ovp, ['--config', cert], (error, stdout, stderr) => {
        if (error) {
          module.exports.Disconnect();
          console.error(error);
          return;
        }
      });
      prc.stdout.on('data', (data) => {
        console.log(data);
        if(data.split('Add a new TAP-Windows')[1]){
          NewTap();
        }
        if (data.split('Sequence ')[1] !== undefined) {
           win.hide();
            Remoteplay();
        }
      });
      OVPPID = prc;
  },
  Disconnect: () => {
    Win.show();
    if(PLAYPID == null && OVPPID == null) {
      return console.log("NON RUN PRC");
    }

    if(PLAYPID != null) {
       PLAYPID.kill();
      console.log("Remoteplay Kill: OK");
    }
    if(OVPPID != null) {
       OVPPID.kill();
      console.log("VPN Kill: OK");
    }

  },
  CertLoad: () => {
    var CERTIFICATE = fs.createWriteStream(cert);
    if(!fs.existsSync(cert)){
      return;
    }
    const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjg4MDRlMDIyYjY0ODIyYWExNGUyZDYiLCJpYXQiOjE1MzU2NDk5ODksImV4cCI6MTUzODI0MTk4OX0.4rHxypuYXlgPPq2uKjH-cwGMUm4Fs9w_WUalrYNLEkc";
      request({
          url: `https://api.ps4play.net/getovpkey`,
          method: "GET",
          headers: {
            'Authorization': auth
          },
        },function(err, httpResponse, body) {
          if (err) {
            return console.log(err);
          }
      }).pipe(CERTIFICATE);
  }
}


const Remoteplay = () => {
  const prc = exec(`CD ${play} && RemotePlayPS4.exe`, (error, stdout, stderr) => {
    module.exports.Disconnect();
     console.log('Remoteplay CLOSE');
   });
   prc.stdout.on('data', (data) => {
      console.log("Remoteplay data: ", data);
   });
}

const NewTap = () => {
  var dir = `${MainDir}\\resources\\win10\\ovp\\tuntap_win\\${os.arch()}\\`;
   exec(`${dir}tapinstall.exe install ${dir}OemVista.inf tap0901`, (error, stdout, stderr) => {
     if (error) {
       console.error(error);
       return;
     }
     if(stdout.split('successfully')){
       module.exports.Connect(Win);
     }
   })
}
