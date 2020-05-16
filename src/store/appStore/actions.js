import { Notify } from "quasar";

export function showNotifcation(context, notification) {
  Notify.create({
    message: notification.message,
    type: notification.type === "INFO" ? "positive" : "negative",
    actions: [
      {
        label: "Dismiss",
        color: "white",
        handler: () => {
          /* ... */
        }
      }
    ]
  });
}
