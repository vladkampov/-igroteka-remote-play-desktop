const { execFile, spawn } = require('child_process');
const path = require('path');

let pidvpn = null;
let playpid = null;

const cert = `${__dirname}/win10/ovp/CERTIFICATE.ovpn`;
const ovpshel = `${__dirname}/win10/ovp/openvpn.exe`;
const play = `${__dirname}/win10/play/Remote Play PS4.exe`;
console.log(ovpshel);
exports.Connect = function(win) {
  const Process = execFile(ovpshel, ['--config', cert], (error, stdout, stderr) => {
    Process.pid.kill();
    win.show();
    console.log("Open VPN CONNECT Close");
  });
  pidvpn = Process;

  console.log(`Spawned child pid: ${Process.pid}`);

  Process.stdout.on('data', function(data) {
    win.show();
    if (data.split('Error')[1] !== undefined) {
      return console.log('Error: ', data.split('Error')[1]);
    }

    if (data.split('Sequence ')[1] !== undefined) {
       console.log('Initialization Connekt: OK');
         win.hide();
          const Strim = spawn(play);
          playpid = Strim.pid;

        console.log(`Playpid child pid: ${playpid}`);
    }
        console.log(data);
  });
}

exports.Disconnect = function () {
    if (pidvpn === null){
      return console.log("No connection");
    }
    pidvpn.kill();


  console.log("Disconnect Succes");
}
