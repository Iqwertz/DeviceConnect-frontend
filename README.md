<h1 align="center">Transfertube-frontend</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> Transfertube is a webapp to easily exchange data between device. It is build with angular and uses websockets for server client communication.

### ✨ [Demo](https://iqwertz.github.io/Transfertube/)

## Install

```sh
npm install
```

## Usage

```sh
ng serve
```

Since all the packages are now a bit outdated you might need to run: 
  
  ```sh
  export NODE_OPTIONS=--openssl-legacy-provider
  ```

This is not recommended for production but since this is just a small project it should be fine. Should this ever be used professionally you should update the packages.

## Features

- [x] Create Session
- [x] Join Session
- [x] Send Messages
- [x] Format Links
- [x] Send Pictures
- [x] Send Documents
- [x] Tap on message to copy
- [x] Search messages
- [x] Session Menu
- [x] User Alerts
- [x] Fully Responsive
- [ ] Quick paste button
- [ ] Share Session
- [ ] Share Message in Session
- [ ] Session Host
- [ ] Custom uuIds to reconnect as same user
- [ ] Loader when uploading pictures / documents

## Bugs

- [ ] when user disconnects and reconnects messages sent during reconnect arent sent after reconnect
- [ ] Maximum session size not defined
- [ ] Search is sensetive to Capslog
- [ ] disconnect when sending large files over server setup (not localhost)
- [ ] header cors error when using server setup (not localhost)

## Backend

Here is the repo for the backend of the project: [backend](https://github.com/Iqwertz/DeviceConnect-backend)

## Author

👤 **Julius Hussl**

- Github: [@Iqwertz](https://github.com/Iqwertz)
