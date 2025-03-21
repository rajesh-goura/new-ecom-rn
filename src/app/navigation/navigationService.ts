// import { createNavigationContainerRef } from "@react-navigation/native";

// export const navigationRef = createNavigationContainerRef<any>(); 
// export function navigate(name: string, params?: object) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }





// import * as React from 'react';
// import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = React.createRef<NavigationContainerRef<any>>();

// export function navigate(name: string, params?: any, force?: boolean) {
//   if (force) {
//     navigationRef.current?.dispatch(
//       CommonActions.reset({
//         index: 1,
//         routes: [{ name, params }],
//       })
//     );
//   } else {
//     navigationRef.current?.navigate(name, params);
//   }
// }






// import * as React from 'react';
// import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

// export const navigationRef = React.createRef<NavigationContainerRef<any>>();

// export function navigate(name: string, params?: any, force?: boolean) {
//   if (force) {
//     navigationRef.current?.dispatch(
//       CommonActions.reset({
//         index: 1,
//         routes: [{ name, params }],
//       })
//     );
//   } else {
//     navigationRef.current?.navigate(name, params);
//   }
// }

// export function navigateToNestedScreen(navigatorName: string, screenName: string, params?: any) {
//   navigationRef.current?.navigate(navigatorName, {
//     screen: screenName,
//     params,
//   });
// }







import * as React from 'react';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any, force?: boolean) {
  if (force) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name, params }],
      })
    );
  } else {
    navigationRef.current?.navigate(name, params);
  }
}

export function navigateToNestedScreen(navigatorName: string, screenName: string, params?: any) {
  navigationRef.current?.navigate(navigatorName, {
    screen: screenName,
    params,
  });
}