// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const server = 'https://appdesarrollo73.cnt.gob.ec';
//const server = 'https://appdesarrollo73.cnt.gob.ec:9966';
//const server='https://appbono.qoopo.net';


export const environment = {
  production: false,
  servicios: server + '/juntos-backend/app/otro.php?',
  cms:'https://juntas.dimater.com/index.php?view=api&tabla='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
