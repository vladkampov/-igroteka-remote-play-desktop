# igroteka-remote-play-desktop

### First of all
Create a `.env` file in the root of the directory. Find `.env.example`.

### Build
- `npm install`
- `npx electron-rebuild`
- `npm run electron-pack` – build react app and wrap it with electron. Powered by `electron-builder`

### Development
- `npm install`
- `npx electron-rebuild`
- `npm start` – starts react-dev-server and electron starts listening to port `3001`

### Where to look first?
- `package.json – "build"` – configuration of the `electron-builder`
- `public/electron-main.js` – entry point of Electron app.
– `src/index.js` – entry point of React app

### References
- [ElectronJS](https://electronjs.org/docs) – Main documentation
- [electron-sudo](https://www.npmjs.com/package/electron-sudo) – Run a subprocess with administrative privileges, prompting the user with a graphical OS dialog if necessary. Useful for background subprocesse which run native Electron apps that need sudo.
- [electron-builder](https://github.com/electron-userland/electron-builder) – Builder utility
- [how to add third-party dependencies]() - https://www.electron.build/configuration/contents#extraresources
- [Pritunl](https://github.com/pritunl/pritunl-client-electron/tree/master/openvpn_win) – this is the example how openvpn .exe file used by Pritunl client powered on Electron
