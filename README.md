# Local World Forwarders Mobile APP #


## Base Setup ##

- Install Node and Npm
-- Reccomended Npm vers. 6.1.0
-- Reccomended Node vers. 8.11.2
- Install Ionic
-- Reccomended Ionic vers. 3.20.0
- Install Cordova
-- Reccomended Cordova vers. 8.0.0


## Configs ##

- all confs are in enviroment.ts files.
-- check all api keys (google maps / captcha and paypal)


## Run ##

- run "npm install" for install all deps.
- run "ionic serve" for local server


## Run Android ##

- Install Android Platform
-- adb-tools, android sdk, gradle required.
-- run "ionic cordova platform add android" for adding android platform
-- run "adb devices" for list usb connected android devices (need debug on device)
-- run "ionic cordova run android" for build apk and run on device/emulator

## Run on Ios ##

- Install Ios Platform
-- Mac osx, xcode required.
-- run "ionic cordova platform add ios" for adding ios platform (xcode project included)
-- run "ionic cordova build ios" for build from sources
-- open generated xcode project and run/deploy to device/emulator
