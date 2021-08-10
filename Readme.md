# Trash App

## Logcat Debugging

`adb -d logcat ReactNativeJS:I '\*:S'`

## Run and Built

npx react-native run-android --variant=release. This runs `./gradlew app:installRelease -PreactNativeDevServerPort=8081` under the hood.
npx react-native run-android

### Android
Create an uploadable bundle release:

cd android
clean: ./gradlew clean
buildRelease: ./gradlew bundleRelease

See also https://reactnative.dev/docs/signed-apk-android
