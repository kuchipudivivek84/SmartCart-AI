export const requestNotificationPermission = async () => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { granted: false, permission: "unsupported" };
  }

  if (Notification.permission === "granted") {
    return { granted: true, permission: Notification.permission };
  }

  if (Notification.permission === "denied") {
    return { granted: false, permission: Notification.permission };
  }

  const permission = await Notification.requestPermission();
  return { granted: permission === "granted", permission };
};

export const showSmartCartNotification = (title, body) => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return null;
  }

  if (Notification.permission !== "granted") {
    return null;
  }

  return new Notification(title, {
    body,
    icon: "/favicon.ico",
  });
};
