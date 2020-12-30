import { 
   SET_CATEGORIES,
   SET_LOADING_ON_PAGE_CHANGE,
   SET_CATEGORIES_TOAST
 } from '../types'

const reducer = (state, { type, payload }) => {
   if (type === SET_LOADING_ON_PAGE_CHANGE) return { ...state, loadingOnPageChange: payload };

   if (type === SET_CATEGORIES) return { ...state, categories: { ...state.categories, items: payload } }

   if (type === SET_CATEGORIES_TOAST) return { ...state, categories: { ...state.categories, isToast: payload.isToast, toast: payload.toast } }

   return state;
}

export default reducer
