// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://sivindicator.intel.com/SysdebugAPI/api/SIVSysDebug/',
  BASE_URL: 'https://sivindicator.intel.com/SysdebugAPI/',
  // BASE_URL: 'https://psda-api-pro-or.apps1-or-int.icloud.intel.com/',
  // API_URL: 'https://sivindicator.intel.com/SysdebugPSA/api/SIVSysDebug/',
  // API_URL: 'https://psda-api-pro-or.apps1-or-int.icloud.intel.com/api/SIVSysDebug/', 
  iamWindowsAuth: 'https://iamws-i.intel.com/api/v1/Windows/Auth'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
