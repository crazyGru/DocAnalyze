// notificationHelper.ts
import { Store } from 'react-notifications-component';

export const createNotification = (type: 'success' | 'danger' | 'info', title: string, message: string) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeInRight"],
    animationOut: ["animate__animated", "animate__fadeOutRight"],
    dismiss: {
      duration: 2000,
      onScreen: true
    }
  });
};
