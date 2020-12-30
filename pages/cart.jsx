import React, { useEffect } from 'react'

import { CartWrapper } from '../components/Pages';
import useCart from '../hooks/useCart';
import CartShowcase from '../components/Pages/CartShowcase';

export default function cart({ heading }) {
   const { 
      cartItems, 
      cartTotal, 
      itemsCount,
      loading, 
      loadingOnUpdate, 
      isToast, 
      toast,
      onSetToast,
      onIsCartEmpty,
      onDeleteCartItem
   } = useCart();

   useEffect(() => {
      onIsCartEmpty();
      return () => {
         onSetToast(false, "")
      }
   }, [])

   return (
      <CartWrapper>
         <CartShowcase 
            heading={heading || "Your Cart"}
            isToast={isToast}
            toast={toast}
            onToastClose={() => onSetToast(false, "")}
            loading={loading}
            itemsCount={itemsCount}
            items={cartItems}
            total={cartTotal}
            loadingOnUpdate={loadingOnUpdate}
            onDelete={({ itemId }) => onDeleteCartItem(itemId)}
         />
      </CartWrapper>
   )
}

export async function getStaticProps() {
   return {
     props: {
        heading: "Your Cart" // just to make this page static bcz due to "getInitialProps" all pages are by default server side.
     }, // will be passed to the page component as props
   }
 }