import React from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Loader, Toast } from '../../components/Common';
import { fetchProductsByCategory } from '../../services/products';
import ProductsShowCase from '../../components/Pages/ProductsShowCase';
import { getCategoriesServices, getCategoryBySlug } from '../../services/categories';

export default function Category({ 
      products: categorizedProducts, 
      productsError,
      category,
      categoryError
   }) {

   const router = useRouter();
   
   if (productsError || categoryError) return <Toast className="mt-8" toast="Something went wrong!" />

   if (router.isFallback) return <Loader size="sm" className="mt-4" />
   return (
      <>
         <Head>
            <title>{category.name} | E-Store</title>
         </Head>
         <ProductsShowCase label={category.name} products={categorizedProducts} />
      </>
   )
}

export async function getStaticProps({ params }) {
   let { products, error: productsError } = await fetchProductsByCategory(params.category);
   if (productsError || !products) products = [];
   if (!productsError) productsError = null;

   let { category, error: categoryError } = await getCategoryBySlug(params.category);
   if (categoryError || !category) category = {};
   if (!categoryError) categoryError = null;

   return {
      props: {
         products,
         productsError,
         category,
         categoryError
      }
   }
}

export async function getStaticPaths() {
   const { categories } = await getCategoriesServices();

   const paths = categories.map(categorie => ({
      params: { category: categorie.slug }
   }))

   return {
      paths,
      fallback: true
   }
}