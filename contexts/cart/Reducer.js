import { 
   SET_CART_COUNT_ITEMS, 
   SET_CART_ITEMS, 
   SET_CART_TOTAL, 
   SET_LOADING, 
   SET_LOADING_ON_UPDATE, 
   SET_TOAST,
   SET_LOADING_ON_CLEAR_CART,
   SET_LOADING_ON_CHECKOUT_CART,
   SET_LOADING_ON_ADD_TO_CART,
   SET_CART_ID
} from '../types';

const Reducer = (state, { type, payload }) => {
   if (type === SET_CART_ID) return { ...state, cartId: payload };

   if (type === SET_CART_ITEMS) return { ...state, items: payload };

   if (type === SET_CART_TOTAL) return { ...state, total: payload };

   if (type === SET_CART_COUNT_ITEMS) return { ...state, itemsCount: payload };
   
   if (type === SET_TOAST) return { ...state, toast: payload.toast, isToast: payload.isToast };
   
   if (type === SET_LOADING) return { ...state, loading: payload };
   
   if (type === SET_LOADING_ON_UPDATE) return { ...state, loadingOnUpdate: payload };

   if (type === SET_LOADING_ON_CLEAR_CART) return { ...state, loadingOnClearCart: payload };
   
   if (type === SET_LOADING_ON_CHECKOUT_CART) return { ...state, loadingOnCheckoutCart: payload };

   return state;
}

export default Reducer;

