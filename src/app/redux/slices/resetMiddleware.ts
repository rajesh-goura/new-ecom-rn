import { Middleware } from '@reduxjs/toolkit';
import { logout, reset as authReset } from '../slices/authSlice';
import { reset as productReset } from '../slices/productSlice';

const resetMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === logout.fulfilled.type) {
    store.dispatch(authReset());
    store.dispatch(productReset());
  }
  return next(action);
};

export default resetMiddleware;