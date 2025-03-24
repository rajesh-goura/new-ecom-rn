import { getCrashlytics } from '@react-native-firebase/crashlytics';
import { getApp } from 'firebase/app';


const crashlytics = getCrashlytics();

export const logErrorToCrashlytics = (error: any) => {
  if (error.response) {
    crashlytics.log(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    crashlytics.recordError(new Error(`API Error: ${error.response.status}`));
  } else if (error.request) {
    crashlytics.log('API Error: No response from server');
    crashlytics.recordError(new Error('API Error: No response from server'));
  } else {
    crashlytics.log(`Unexpected Error: ${error.message}`);
    crashlytics.recordError(error);
  }
};


export const triggerTestCrash = () => {
  crashlytics.log('Test crash triggered manually');
  throw new Error('This is a test crash for Crashlytics!');
};
