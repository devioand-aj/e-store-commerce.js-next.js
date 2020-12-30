import { 
   SET_CHECKOUT_TOKEN, 
   SET_USER_DETAIL, 
   SET_SUCCESS, SET_TOAST, 
   SET_CHECKOUT_TOKEN_SUCCESS, 
   SET_USER_DETAIL_SUCCESS, 
   SET_CHECKOUT_STEP, 
   SET_ORDER_SUCCESS 
} from '../types';

const reducer = (state, { type, payload }) => {
   if (type === SET_USER_DETAIL) return { ...state, userDetail: payload };

   if (type === SET_CHECKOUT_TOKEN) return { ...state, token: payload };

   if (type === SET_SUCCESS) return { ...state, isSuccess: payload };

   if (type === SET_ORDER_SUCCESS) return { ...state, isOrderSuccess: payload };

   if (type === SET_CHECKOUT_TOKEN_SUCCESS) return { ...state, isTokenSuccess: payload };

   if (type === SET_CHECKOUT_STEP) return { ...state, step: payload }

   if (type === SET_USER_DETAIL_SUCCESS) return { ...state, isUserDetailSuccess: payload };

   if (type === SET_TOAST) return { ...state, isToast: payload.isToast, toast: payload.toast };
   
   return state;
}

export default reducer;