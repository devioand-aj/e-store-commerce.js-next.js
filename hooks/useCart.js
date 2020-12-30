import { useContext } from 'react'

import { cartContext } from '../contexts/cart'

export default function useCart() {
   return useContext(cartContext);
}
