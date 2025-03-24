import { getCrashlytics } from "@react-native-firebase/crashlytics";

export const triggerTestCrasher = () => {
    
    const crashlytics = getCrashlytics();
    crashlytics.log('Test crash triggered');
    throw new Error('This is a test crash for Crashlytics!');
  };