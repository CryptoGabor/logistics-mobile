# LWF MOBILE - GETTING STARTED #

## Local World Forwarders Mobile APP ##

### Setup ###

* [Install Node and (obviously) NPM](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* [Install Ionic](https://ionicframework.com/getting-started)
* **git clone** git@bitbucket.org:innoviu/localworldforwardersmobile.git
* In your project path run: **npm install**
* Serve the project via Browser running: **ionic serve**

## Prerequisites Android ##

* ionic: ```3.20.0```
* codrova: ```8.0.0```
* npm: ```3.10.10```
* node: ```6.11.3```
* adb-tools **or** Android Studio
* gradle: ^2.2.3 (On linux you need: /usr/bin/gradle)
* java: 8

## Run on Android ##
If you want to run the project on your Android make sure that:

* adb-tools are installed
* debug is enabled on your device
* running **adb devices** prints out your phone code
* the phone is switched on

If everything's alright run **ionic cordova run android**

## Manage components ##
Every component is shipped with one action button and a result box enabled by a ```test``` flag inside the controller.

## Component Events ##
Every component, when success, fires a Event and a result:

**QR Reader:** ```qr:read``` returns ```data:string```

**GPS Map:** ```map:loaded``` returns ```map:mapObject```

**Camera:** ```pic:loaded``` returns ```image:string(base64)```
