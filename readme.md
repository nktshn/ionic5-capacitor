# "Future Game Store" - Ionic 5 + Capacitor demo app

# How to build & run

- install NodeJS, npm
- install ionic CLI by ```npm i @ionic/cli@latest -g``` 
- make sure you are in "master" git branch
- execute ```npm i```

## Web
- execute ```ionic serve```

## Android

- Make sure you have all Android related stuff installed: Android SDK, Gradle, Java (8 is recommended) and all system variables like JAVA_HOME, ANDROID_SDK_ROOT are set.
- execute ```npx cap copy```
- plug Android device in with debug mode enabled (or use simulator) and execute ```npm run install:android```