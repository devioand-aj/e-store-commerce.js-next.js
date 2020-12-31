import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FcOk } from 'react-icons/fc';
import Router from 'next/router';

import useCart from '../../hooks/useCart';
import useCheckout from '../../hooks/useCheckout';
import { fetchLatestProducts } from '../../services/products';
import { HorizontalShowcase } from '../../components/Layouts/HorizontalShowcase';

export default function Done({ latestProducts, error }) {
   const cartContext = useCart();
   const checkoutContext = useCheckout();
   const [isError, setIsError] = useState(true);

   useEffect(() => {
      if (!checkoutContext.isOrderSuccess)  return Router.replace("/");
      
      setIsError(false);
      cartContext.onRefreshCart();  
   }, [])
   
   if (isError) return null;

   return (
      <>
         <Head>
            <title>Checkout Done | E-Store</title>
         </Head>
         <div className="container mt-8 flex flex-col items-center">
         <div className="flex items-center w-max bg-secondary px-8 py-4">
               <FcOk className="text-4xl mr-2" />
               <h1 className="text-2xl">Your order is confirmed! &#127881;</h1>
            </div>
            <div className="mt-4">
               <h1 className="underline text-center mt-4">
                  <Link href="/products"><a>Go Back to Products</a></Link>  
               </h1>
            </div>
         </div>
         {!error && <HorizontalShowcase 
            label="You may interested in!" 
            items={latestProducts}  
         />}
      </>
   )
}

export async function getStaticProps() {
   let { products, error } = await fetchLatestProducts();

   if (error) products = [];
 
   if (!error) error = null  // otherwise error is "undefined" that is not acceptable in serealized object. 
 
   return {  
     props: {
       latestProducts: products,
       error,
     },
     revalidate: 1,
   }
 }
