import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

/**
 * Retourne true si on est sur une plateforme native (iOS/Android).
 */
export const isNative = () => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

/**
 * Demande la permission d'envoyer des notifications locales.
 * Sur le web, essaie d'utiliser l'API Notifications standard.
 */
export async function ensureNotificationPermission() {
  try {
    if (isNative()) {
      const { display } = await LocalNotifications.requestPermissions();
      return display === "granted";
    }

    if ("Notification" in window) {
      if (Notification.permission === "granted") return true;
      const result = await Notification.requestPermission();
      return result === "granted";
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Programme une notification à `inSeconds` secondes dans le futur.
 * Sur le web, on se contente d'un simple console.log pour rester non bloquant.
 */
export async function scheduleWashFinishedNotification(
  inSeconds: number,
  machineName?: string,
) {
  const hasPermission = await ensureNotificationPermission();
  if (!hasPermission) {
    console.warn("Notifications non autorisées par l'utilisateur.");
    return;
  }

  const title = "Cycle terminé";
  const body = machineName
    ? `Votre machine ${machineName} a terminé son cycle.`
    : "Votre cycle de lavage est terminé.";

  try {
    if (isNative()) {
      const triggerDate = new Date(Date.now() + inSeconds * 1000);
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title,
            body,
            schedule: { at: triggerDate },
          },
        ],
      });
    } else {
      // Fallback web simple
      if ("Notification" in window && Notification.permission === "granted") {
        setTimeout(() => {
          // eslint-disable-next-line no-new
          new Notification(title, { body });
        }, inSeconds * 1000);
      } else {
        console.log("[SmartWash] Notification (simulée):", title, body);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la programmation de la notification:", error);
    throw error;
  }
}

