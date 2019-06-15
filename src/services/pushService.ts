var PushNotification = require("react-native-push-notification");

export default class PushService {
  public init() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token: any) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification: any) {
        console.log("NOTIFICATION:", notification);
      }
    });
  }

  public scheduleLocal() {
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now()),
      vibrate: true,
      vibration: 300,
      title: "Mental Health App",
      message: "Don’t forget to finish your assigned tasks for today!",
      repeatType: "day"
    });
  }
}
