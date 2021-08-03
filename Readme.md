# Trash App

## Logcat

adb -d logcat ReactNativeJS:I '\*:S'

## Run and Built

npx react-native run-android --variant=release
npx react-native run-android

### Android

cd android
clean: ./gradlew clean
buildRelease: ./gradlew bundleRelease
