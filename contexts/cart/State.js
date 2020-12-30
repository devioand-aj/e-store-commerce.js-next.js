import React, { useReducer } from 'react';

import Context from './context';
import Reducer from './Reducer';
import { 
   SET_TOAST,
   SET_LOADING, 
   SET_CART_ITEMS, 
   SET_CART_TOTAL, 
   SET_LOADING_ON_UPDATE,
   SET_CART_COUNT_ITEMS,
   SET_LOADING_ON_CLEAR_CART,
   SET_LOADING_ON_CHECKOUT_CART,
   SET_CART_ID,
} from '../types'
import { 
   fetchCartServices, 
   updateCartServices, 
   addItemServices,
   clearCartServices,
   deleteCartItemServices,
   refreshCartServices
} from '../../services/cart';


const CartState = ({ children }) => {
   const initialState = {
      cartId: '',
      items: [],
      updatedItems: [],
      total: {},
      itemsCount: null,
      loading: false,
      isToast: false,
      toast: '',
      loadingOnUpdate: false,
      loadingOnClearCart: false,
      loadingOnCheckoutCart: false,
   }

   const [state, dispatch] = useReducer(Reducer, initialState);
   const setDispatch = (type, payload) => dispatch({ type, payload })

   // Refactorization of dispatch
   const setCartIdDispatch = (id) => setDispatch(SET_CART_ID, id);
   const setItemsDispatch = (items) => setDispatch(SET_CART_ITEMS, items); 
   const setTotalDispatch = (total) => setDispatch(SET_CART_TOTAL, total);
   const setCounItemsDispatch = (itemsCount) => setDispatch(SET_CART_COUNT_ITEMS, itemsCount);
   const setToastDispatch = (isToast, toast) => setDispatch(SET_TOAST, { isToast, toast });
   const setLoadingDispatch = (isLoading = true) => setDispatch(SET_LOADING, isLoading);
   const setLoadingOnUpdateDispatch = (isLoading = true) => setDispatch(SET_LOADING_ON_UPDATE, isLoading);
   const setLoadingOnClearCartDispatch = (isLoading = true) => setDispatch(SET_LOADING_ON_CLEAR_CART, isLoading);
   const setLoadingOnCheckoutCartDispatch = (isLoading = true) => setDispatch(SET_LOADING_ON_CHECKOUT_CART, isLoading);

   // Handlers
   const handleFetchCart = async () => {
      setLoadingDispatch();

      const { cart, error } = await fetchCartServices();

      if (error) {
         setLoadingDispatch(false);
         setToastDispatch(true, "Something went wrong while fetching card!")

         return { error }
      }

      const { id: cartId, subtotal, line_items: items, total_unique_items: itemsCount } = cart;

      setCounItemsDispatch(itemsCount);
      setItemsDispatch(items);
      setTotalDispatch(subtotal);
      setLoadingDispatch(false);
      setCartIdDispatch(cartId);
      
      if (itemsCount < 1) setToastDispatch(true, "Cart is emptyyyy!");

      return { cart };
   }

   const handleRefreshCart = async () => {
      await refreshCartServices();
      await handleFetchCart();
   }


   const handleUpdateCart = async (id, body) => {
      setLoadingOnUpdateDispatch();

      const { cart: updatedCart, error } = await updateCartServices(id, body);

      if (error) {
         setLoadingOnUpdateDispatch(false);
         setToastDispatch(true, 'Something really went wrong!');
         
         return { cart: null };
      };

      const { cart: { line_items: items, subtotal, total_unique_items: itemsCount } } = updatedCart;

      setItemsDispatch(items);
      setTotalDispatch(subtotal);
      setLoadingOnUpdateDispatch(false);
      setCounItemsDispatch(itemsCount);

      if (itemsCount === 0) setToastDispatch(true, "Cart is empty after updating!"); 
      
      return { cart: updatedCart }
   }

   const handleSetToast = async (isToast, toast) => {
      setToastDispatch(isToast, toast);
   }

   const handleAddItemCart = async (id, quantity) => {
      const { cart, error } = await addItemServices(id, quantity);

      if (error) return { error };

      const { cart: { subtotal, line_items: items, total_unique_items: itemsCount } } = cart;

      setCounItemsDispatch(itemsCount);
      setItemsDispatch(items);
      setTotalDispatch(subtotal);

      if (itemsCount > 0) setToastDispatch(false, "");

      return { cart };
   }

   const handleClearCart = async () => {
      setLoadingOnClearCartDispatch();

      const { cart, error } = await clearCartServices();

      if (error) {
         setToastDispatch(true, "Error while clearing cart!");
         setLoadingOnClearCartDispatch(false);

         return { error };
      }

      const { cart: { line_items: items, subtotal, total_unique_items: itemsCount } } = cart;

      setItemsDispatch(items);
      setTotalDispatch(subtotal);
      setCounItemsDispatch(itemsCount);
      setLoadingOnClearCartDispatch(false);

      if (itemsCount === 0) setToastDispatch(true, 'No item is left behind!');
      return { cart };
   } 

   const handleOnIsCartEmpty = () => {
      setLoadingDispatch();

      if (state.itemsCount === null) {
         setLoadingDispatch(false);

         return false;
      };

      if (state.itemsCount > 0) {
         setLoadingDispatch(false);
         return false;
      };

      if (state.itemsCount === 0) setToastDispatch(true, "Cart is Empty!");
      setLoadingDispatch(false);
   }

   const handleDeleteCartItem = async (id) => {
      // const error = true;
      setLoadingOnUpdateDispatch();
      const prevItems = state.items;
      
      const { cart, error } = await deleteCartItemServices(id);

      const newItems = state.items.filter(item => item.id !== id);
      setItemsDispatch(newItems);

      if (error) {
         setLoadingOnUpdateDispatch(false);
         setToastDispatch(true, "Something went wrong while deleting!");
         setItemsDispatch(prevItems);

         return { error };
      }

      const { cart: { total_unique_items: itemsCount, subtotal: total } } = cart;

      setLoadingOnUpdateDispatch(false);
      setItemsDispatch(newItems);
      setCounItemsDispatch(itemsCount);
      setTotalDispatch(total);

      if (itemsCount === 0) setToastDispatch(true, 'All items are deleted!');

      return { cart };
   }

   

   return (
      <Context.Provider
         value={{
            cartId: state.cartId,
            loading: state.loading,
            loadingOnUpdate: state.loadingOnUpdate,
            loadingOnClearCart: state.loadingOnClearCart,
            loadingOnCheckoutCart: state.loadingOnCheckoutCart,
            loadingOnAddToCart: state.loadingOnAddToCart,
            toast: state.toast,
            isToast: state.isToast,
            cartItems: state.items,
            cartTotal: state.total,
            itemsCount: state.itemsCount,
            onSetToast: handleSetToast,
            onClearCart: handleClearCart,
            onFetchCart: handleFetchCart,
            onUpdateCart: handleUpdateCart,
            onAddItemToCart: handleAddItemCart,
            onIsCartEmpty: handleOnIsCartEmpty,
            onDeleteCartItem: handleDeleteCartItem,
            onRefreshCart: handleRefreshCart,
         }}
      >
         {children}
      </Context.Provider>
   ) 
};

export default CartState