import React, { useContext, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'

import NProgress from 'nprogress';
import Context from './context';
import Reducer from './reducer';
import { 
   SET_LOADING_ON_PAGE_CHANGE,
   SET_CATEGORIES,
   SET_CATEGORIES_TOAST
} from '../types';
import { cartContext } from '../cart';
import { favouriteContext } from '../favourites';

export default function GlobalState({ children, props: { categories } }) {
   const { onFetchCart } = useContext(cartContext);
   const { onFetchFavouriteItems } = useContext(favouriteContext);
   const router = useRouter();

   useEffect(() => {
      routeEvents();
      setCategories(categories);
      onFetchCart();
      onFetchFavouriteItems();
   }, [])

   function routeEvents() {
      router.events.on('routeChangeStart', () => {
         handleOnChangeLoadingOnPageChange(true);
         NProgress.start();
      })

      router.events.on('routeChangeComplete', () => {
         handleOnChangeLoadingOnPageChange(false);
         NProgress.done();
      });
   } 

   const initialState = {
      loadingOnPageChange: false,
      categories: {
         items: [],
         isToast: false,
         toast: '',
      },
   }

   
   const [state, dispatch] = useReducer(Reducer, initialState);
   const setDispatch = (type, payload) => dispatch({ type, payload })
   
   // Refactorization of dispatch
   const setLoadingOnPageChangeDispatch = (isLoading = true) => setDispatch(SET_LOADING_ON_PAGE_CHANGE, isLoading); 
   const setCategoriesDispatch = (categories) => setDispatch(SET_CATEGORIES, categories);
   const setCategoriesToastDispatch = (isToast, toast) => setDispatch(SET_CATEGORIES_TOAST, { isToast, toast });

   //  Handlers
   const setCategories = (categories) => {
      setCategoriesDispatch(categories.items);
      setCategoriesToastDispatch(false, '');

      if (categories.error) {
         setCategoriesToastDispatch(true, "Something went wrong while fetching categories");
         setCategoriesDispatch([]);
      }
   }

   const handleOnChangeLoadingOnPageChange = (isLoading) => {
      setLoadingOnPageChangeDispatch(isLoading);
   }

   const handleOnClickPrevPage = () => {
      router.back();
   }

   const handleSetToastCategory = (isToast, toast) => {
      setCategoriesToastDispatch(isToast, toast);
   }

   return (
      <Context.Provider 
         value={{
            categories: { 
               items: state.categories.items,
               isToast: state.categories.isToast,
               toast: state.categories.toast,
               onCloseToast: handleSetToastCategory
            },
            loadingOnPageChange: state.loadingOnPageChange,
            onChangeLoadingOnPageChange: handleOnChangeLoadingOnPageChange,
            onClickPrevPage: handleOnClickPrevPage
         }}
      >
         {children}
      </Context.Provider>
   )
}
