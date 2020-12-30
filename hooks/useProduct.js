import { useContext, useEffect } from 'react'
import { productContext } from '../contexts/products'

export default function useProduct(products) {
   const context =  useContext(productContext);
   if (!products) return context;

   const { onFetchProducts } = context;

   useEffect(() => {
      onFetchProducts(products)
   }, [products])

   return context;
}
