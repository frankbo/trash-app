# Trash App
An App that displays the dates the trash gets picked up in Bad Berleburg and the surrounding cities.

Current features
- Remembers the picked city in local storage
- Only displays future pick ups
- Changing the city and the trash kind can be done in the settings.


Right now the App is only available for Android even though an Ios version should be easy to compile as well, since the App is written with react native.
The backend is available [here](https://github.com/frankbo/trash-app-api)

## Debugging

Logcat: `adb -d logcat ReactNativeJS:I '\*:S'`

## Run and Built

`npx react-native run-android --variant=release`. This runs `./gradlew app:installRelease -PreactNativeDevServerPort=8081` under the hood.
`npx react-native run-android`

### Android
Create an uploadable bundle release:

`cd android`
`clean: ./gradlew clean`
`buildRelease: ./gradlew bundleRelease`

See also [The official documentation](https://reactnative.dev/docs/signed-apk-android)
