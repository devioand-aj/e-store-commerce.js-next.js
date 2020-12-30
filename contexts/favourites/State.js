import React, { useReducer } from 'react'
import { SET_FAVOURITES, SET_FAVOURITE_COUNT_ITEMS, SET_LOADING, SET_TOAST } from '../types';

import Context from './context';
import Reducer from './reducer';
import { 
   fetchFavouriteItemsServices, 
   removeFavouriteItemServices, 
   setFavouriteItemServices 
} from '../../services/favourites';

export default function FavouriteState({ children }) {
   const initialState = {
      items: [],
      countItems: null,
      loading: false,
      isToast: false,
      toast: '',
   }

   const [state, dispatch] = useReducer(Reducer, initialState);
   const setDispatch = (type, payload) => dispatch({ type, payload });

   const setFavouriteItemsDispatch = (favouriteItems) => setDispatch(SET_FAVOURITES, favouriteItems);
   const setCountItemsDispatch = (count) => setDispatch(SET_FAVOURITE_COUNT_ITEMS, count);
   const setLoadingDispatch = (isLoading = true) => setDispatch(SET_LOADING, isLoading);
   const setToastDispatch = (isToast, toast) => setDispatch(SET_TOAST, { isToast, toast });

   const handleFetchFavouriteItems = async () => {
      setLoadingDispatch();
      const { storedItems, error } = await fetchFavouriteItemsServices();

      if (error) {
         setLoadingDispatch(false);
         setToastDispatch(true, "Something went wrong!");

         return;
      };

      setFavouriteItemsDispatch(storedItems);
      setCountItemsDispatch(storedItems.length);
      setLoadingDispatch(false);

      // if (storedItems.length === 0) setToastDispatch(true, "There is no favourite yet!");
   }

   const handleIsFavouriteEmpty = () => {
      setLoadingDispatch();

      if (state.countItems === null) {
         setLoadingDispatch(false);
         return false
      };

      if (state.countItems > 0) {
         setLoadingDispatch(false);
         return false;
      };

      if (state.countItems === 0) setToastDispatch(true, "There is no favourite yet!");
      setLoadingDispatch(false);
   }

   const handleSetFavouriteItem = async (item) => {
      setLoadingDispatch();
      const { storedItems, error } = await setFavouriteItemServices(item);
      
      if (error) {
         setLoadingDispatch(false);
         setToastDispatch(true, 'Something went wrong!');

         return { error };
      }

      setFavouriteItemsDispatch(storedItems);
      setCountItemsDispatch(storedItems.length);
      setLoadingDispatch(false);

      return { storedItems }
   }

   const handleRemoveFavouriteItem = async (id) => {
      setLoadingDispatch();
      const { storedItems, error } = await removeFavouriteItemServices(id);

      if (error) {
         setLoadingDispatch(false);
         setToastDispatch(true, "Something went wrong!");

         return { error };
      }

      setFavouriteItemsDispatch(storedItems);
      setCountItemsDispatch(storedItems.length);
      setLoadingDispatch(false);

      if (storedItems.length === 0) setToastDispatch(true, "No item is left behind...")

      return { storedItems }
   }

   const handleSetToast = (isToast, toast) => {
      setToastDispatch(isToast, toast);
   }

   return (
      <Context.Provider
         value={{
            favouriteItems: state.items,
            countFavouriteItems: state.countItems,
            toast: state.toast,
            isToast: state.isToast,
            loading: state.loading,
            onSetToast: handleSetToast,
            onFetchFavouriteItems: handleFetchFavouriteItems,
            onSetFavouriteItem: handleSetFavouriteItem,
            onRemoveFavouriteItem: handleRemoveFavouriteItem,
            onIsFavouriteEmpty: handleIsFavouriteEmpty,
         }}   
      >
         {children}
      </Context.Provider>
   )
}
