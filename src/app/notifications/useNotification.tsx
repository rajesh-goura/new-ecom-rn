

import { Alert, PermissionsAndroid } from "react-native";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import { navigate, navigateToNestedScreen } from "../navigation/navigationService";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const requestUserPermission = async () => {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("✅ Notification permission granted");
  } else {
    console.log("❌ Notification permission revoked");
  }
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log(`📩 FCM Token: ${token}`);
  } catch (error) {
    console.error(`❌ Failed to get FCM token: ${error}`);
  }
};

const onMessageReceived = async (remoteMessage: any) => {
  console.log("📨 Foreground Message Received:", remoteMessage);
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || "New Notification",
    body: remoteMessage.notification?.body || "You have a new message",
    data: remoteMessage.data,
    android: {
      channelId,
      pressAction: {
        id: "default",
      },
    },
  });
};

const handleNavigationOnPress = (event: any, token: string | null) => {
  if (event.type === EventType.PRESS) {
    let payload;

    try {
      payload = JSON.parse(event.detail.notification?.data?.payload || '{}');
    } catch (error) {
      console.error("Failed to parse payload:", error);
      return;
    }

    const screen = payload.screen;
    const id = payload.id;
    console.log("📍 Navigating to screen:", screen);

    if (!token) {
      Alert.alert("Login Required", "You need to log in first to access this page.");
      return;
    }

    if (screen === "ProductDetails" && id) {
      try {
        navigate(screen, { id }, true); // Force navigation with new parameters
      } catch (error) {
        console.error("❌ Navigation error:", error);
      }
    } else if (screen === "Profile" || screen === "Orders" || screen === "Another") {
      try {
        navigateToNestedScreen("MainTabs", screen);
      } catch (error) {
        console.error("❌ Navigation error:", error);
      }
    } else if (screen) {
      try {
        navigate(screen);
      } catch (error) {
        console.error("❌ Navigation error:", error);
      }
    }
  }
};

const handleBackgroundNotification = async (notification: any, token: string | null) => {
  console.log("🔄 Background message received:", notification);

  let payload;

  try {
    payload = JSON.parse(notification?.data?.payload || '{}');
  } catch (error) {
    console.error("Failed to parse payload:", error);
    return;
  }

  const screen = payload.screen;
  const id = payload.id;
  if (!token) {
    Alert.alert("Login Required", "You need to log in first to access this page.");
    return;
  }

  if (screen === "ProductDetails" && id) {
    try {
      navigate(screen, { id }, true); // Force navigation with new parameters
    } catch (error) {
      console.error("❌ Navigation error:", error);
    }
  } else if (screen === "Profile" || screen === "Orders" || screen === "Another") {
    try {
      navigateToNestedScreen("MainTabs", screen);
    } catch (error) {
      console.error("❌ Navigation error:", error);
    }
  } else if (screen) {
    try {
      navigate(screen);
    } catch (error) {
      console.error("❌ Navigation error:", error);
    }
  }
};

export const useNotification = () => {
  const token = useSelector((state: RootState) => state.auth.token); 

  useEffect(() => {
    requestUserPermission();
    getToken();

    // Foreground Notifications
    const unsubscribeForegroundMessage = messaging().onMessage(onMessageReceived);

    // Foreground Notification Click Event
    const unsubscribeForegroundEvent = notifee.onForegroundEvent((event) =>
      handleNavigationOnPress(event, token)
    );

    // App opened from background state
    const unsubscribeBackground = messaging().onNotificationOpenedApp((notification) =>
      handleBackgroundNotification(notification, token)
    );

    // Handle case when the app is killed & reopened via notification
    messaging()
      .getInitialNotification()
      .then((notification) => {
        if (notification) {
          console.log("🚀 App launched from killed state", notification);
          handleBackgroundNotification(notification, token);
        }
      });

    return () => {
      unsubscribeForegroundMessage();
      unsubscribeForegroundEvent();
      unsubscribeBackground();
    };
  }, [token]); 
};