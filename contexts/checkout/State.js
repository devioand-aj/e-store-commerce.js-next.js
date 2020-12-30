import { useReducer, useEffect, useContext } from 'react';
import _ from 'lodash';

import Context from './context';
import Reducer from './reducer';
import { SET_CHECKOUT_TOKEN, SET_USER_DETAIL, SET_SUCCESS, SET_TOAST, SET_CHECKOUT_TOKEN_SUCCESS, SET_USER_DETAIL_SUCCESS, SET_CHECKOUT_STEP, SET_ORDER_SUCCESS } from '../types';
import { getCapturedOrderServices, getCheckoutTokenByCartIdServices, getCheckoutTokenByProductIdServices } from '../../services/checkout';

const CheckoutState = ({ children }) => {
   const initialState = {
      userDetail: {},
      token: {},
      isSuccess: false,
      isOrderSuccess: false,
      isTokenSuccess: false,
      isUserDetailSuccess: false,
      isToast: false,
      toast: "",
      step: 0,
   }

   const [state, dispatch] = useReducer(Reducer, initialState);
   const setDispatch = (type, payload) => dispatch({ type, payload })

   useEffect(() => {
      // console.log('(userDetail) useEffect :: Checkout State : ', { userDetail: state.userDetail })
      const isEmpty = _.isEmpty(state.userDetail);
      if (isEmpty) {
         setIsUserDetailSuccessDispatch(false);
         setStepDispatch(2);
         
         return;
      };

      setIsUserDetailSuccessDispatch(true);
      setStepDispatch(2);
   }, [state.userDetail]);

   useEffect(() => {
      // console.log('(checkoutToken) useEffect :: Checkout State : ', { checkoutToken: state.token })
      const isEmpty = _.isEmpty(state.token);
      if (isEmpty) {
         setStepDispatch(0);
         setIsTokenSuccessDispatch(false);

         return;
      }

      setIsTokenSuccessDispatch(true);
      setStepDispatch(1);
   }, [state.token])

   // disptach (reducer) helpers
   const setTokenDispatch = (token) => setDispatch(SET_CHECKOUT_TOKEN, token);
   const setIsSuccessDispatch = (isSuccess) => setDispatch(SET_SUCCESS, isSuccess);
   const setIsTokenSuccessDispatch = (isSuccess) => setDispatch(SET_CHECKOUT_TOKEN_SUCCESS, isSuccess);
   const setUserDetailDispatch = (userDetail) => setDispatch(SET_USER_DETAIL, userDetail);
   const setToastDispatch = (isToast, toast) => setDispatch(SET_TOAST, { isToast, toast });
   const setIsUserDetailSuccessDispatch = (isSuccess) => setDispatch(SET_USER_DETAIL_SUCCESS, isSuccess);
   const setStepDispatch = (step) => setDispatch(SET_CHECKOUT_STEP, step);
   const setIsOrderSuccessDispatch = (isSuccess) => setDispatch(SET_ORDER_SUCCESS, isSuccess);

   // HANDLERS
   const handleSetUserDetail = async (userDetail) => {
      setUserDetailDispatch(userDetail);
   }

   const handleGenCheckoutToken = async ({ cartId, productId }) => {
      let res = {};

      if (cartId) res = await getCheckoutTokenByCartIdServices(cartId);
      if (productId) res = await getCheckoutTokenByProductIdServices(productId);

      const { checkoutToken, error } = res;

      if (error) {
         setToastDispatch(true, "Something went wrong while generating token!");
         setIsTokenSuccessDispatch(false);

         return { error };
      }
      
      setTokenDispatch(checkoutToken);

      return { checkoutToken };
   }

   const handleSetToast = (isToast, toast) => {
      setToastDispatch(isToast, toast);
   }

   const handleSetCheckoutStep = (step) => {
      setStepDispatch(step);
   }

   const handleOrderConfirm = async () => {
      const { userDetail, token } = state;

      if (_.isEmpty(userDetail) && _.isEmpty(token)) return { error: 'Invalid data!' };

      const  { capturedOrder, error } = await getCapturedOrderServices(token, userDetail);

      if (error) return { error };

      setIsOrderSuccessDispatch(true);
      return { capturedOrder };
   }

   return (
      <Context.Provider 
         value={{
            toast: state.toast,
            token: state.token,
            isToast: state.isToast,
            isSuccess: state.isSuccess,
            checkoutStep: state.step,
            userDetail: state.userDetail,
            checkoutToken: state.token,
            isOrderSuccess: state.isOrderSuccess,
            isCheckoutTokenSuccess: state.isTokenSuccess,
            onSetUserDetail: handleSetUserDetail,
            onGenCheckoutToken: handleGenCheckoutToken,
            onSetCheckoutStep: handleSetCheckoutStep,
            onSetToast: handleSetToast,
            onOrderConfirm: handleOrderConfirm,
            onSetCheckoutToken: (obj) => setTokenDispatch(obj), 
         }}
      >
         {children}
      </Context.Provider>
   )
}

export default CheckoutState;
