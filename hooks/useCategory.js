import { useContext } from 'react';
import _ from 'lodash';

import { globalContext } from '../contexts/global';

export default function useCategory() {
   const context = useContext(globalContext);

   if (!context) return;

   const { categories: { 
      items: categories,  
      isToast: isToastCategory,
      toast: toastCategory,
      onCloseToast: onCloseToastCategory
   }} = context;

   return { categories, isToastCategory, toastCategory, onCloseToastCategory };
}
