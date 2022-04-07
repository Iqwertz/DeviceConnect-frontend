export const environment = {
  production: true,
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
