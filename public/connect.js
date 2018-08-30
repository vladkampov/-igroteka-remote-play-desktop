const { execFile, spawn, exec } = require('child_process');
const path = require('path');

let OVPPID = null;
let PIDPLAY = null;

const cert = `${__dirname}/win10/ovp/CERTIFICATE.ovpn`;
const ovpshel = `${__dirname}/win10/ovp/openvpn.exe`;
const play = `${__dirname}\\win10\\play\\`;//RemotePlayPS4.exe

exports.Connect = function(win) {
  const Process = execFile(ovpshel, ['--config', cert], (error, stdout, stderr) => {
    Process.pid.kill();
    win.show();
    console.log("Open VPN CONNECT Close");
  });
  OVPPID = Process;

  console.log(`Spawned child pid: ${Process.pid}`);

  Process.stdout.on('data', function(data) {
    win.show();
    if (data.split('Error')[1] !== undefined) {
      return console.log('Error: ', data.split('Error')[1]);
    }

    if (data.split('Sequence ')[1] !== undefined) {
       console.log('Initialization Connekt: OK');
         win.hide();
    let PIDPLAY = exec(`cd ${play} && RemotePlayPS4.exe`, (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
             });
          PIDPLAY = PIDPLAY.pid;
        console.log(`Playpid child pid: ${PIDPLAY}`);
    }
  });
}

exports.Disconnect = function () {
    if (OVPPID === null){
      return console.log("No connection");
    }
    OVPPID.kill();
 console.log("Disconnect Succes");
}
