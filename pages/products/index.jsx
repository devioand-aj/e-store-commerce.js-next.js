import React from 'react';
import Head from 'next/head';

import { fetchAllProducts } from '../../services/products';
import ProductsShowCase from '../../components/Pages/ProductsShowCase';

export default function products({ products: staticProducts }) {
   return (
      <>
         <Head>
            <title>Products | E-Store</title>
         </Head>
         <ProductsShowCase label="All Products" products={staticProducts} />
      </>
   )
}

export async function getStaticProps() {
   let { products, meta, error } = await fetchAllProducts();

   if (error) products = [];

   return {
     props: {
        products
     },
     revalidate: 1,
   }
 }
