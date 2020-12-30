import { useContext } from 'react';

import { checkoutContext } from '../contexts/checkout'

export default function useCheckout() {
   return useContext(checkoutContext);      
}
