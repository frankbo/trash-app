import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { AppState, Platform } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import { Item } from "../Views/Main";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === "ios",
});

const createDefaultChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "default-channel-id", // (required)
      channelName: `Default channel`, // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

const getTomorrow = (): Date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(12, 0, 0, 0);
  return tomorrow;
};

const scheduleNotification = (items: Item[]) => {
  PushNotification.cancelAllLocalNotifications();

  const tomorrow = getTomorrow();
  const date = new Date(new Date().setHours(12, 0, 0, 0)); // Every day at 12

  items.slice(0, 5).forEach((item) => {
    if (new Date(item.dtstart).getDate() < tomorrow.getDate()) {
      PushNotification.localNotificationSchedule({
        channelId: "default-channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        message: `${item.kind} at ${item.dtstart}`,
        date,
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      });
    }
  });

  PushNotification.localNotificationSchedule({
    channelId: "default-channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
    message: "Random new message",
    date,
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
  });
};

export { createDefaultChannel, scheduleNotification };
