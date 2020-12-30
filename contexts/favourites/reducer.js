import { SET_FAVOURITES, SET_FAVOURITE_COUNT_ITEMS, SET_LOADING, SET_TOAST } from '../types';

const reducer = (state, { type, payload }) => {
   if (type === SET_FAVOURITES) return { ...state, items: payload }

   if (type === SET_FAVOURITE_COUNT_ITEMS) return { ...state, countItems: payload }

   if (type === SET_LOADING) return { ...state, loading: payload }

   if (type === SET_TOAST) return { ...state, isToast: payload.isToast, toast: payload.toast }

   return state;
};

export default reducer;