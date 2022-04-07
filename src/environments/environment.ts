// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socketEndpoint: 'https://transfertube.herokuapp.com', //'http://62.178.37.97:4269' //'http://172.16.40.80:4269', //http://localhost:3000
  messageIdentifier: 'chat message',
  maxMessageLength: 10000, //in chars
  userAlertTimeout: 3000,
  chunkSize: 100000,
  reconnectSettings: {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  },
  pictureLimits: {
    maxSize: 10485760, //10Mb (in bytes)
    allowedTypes: ['image/png', 'image/jpeg'],
    maxHeight: 15200,
    maxWidth: 25600,
  },
  fileLimits: {
    maxSize: 104857600, //100Mb (in bytes)
    forbiddenTypes: [],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
