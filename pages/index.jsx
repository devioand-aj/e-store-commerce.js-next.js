import { useEffect, useState } from 'react';
import Head from 'next/head';

import { HeroSection } from '../components/Layouts';
import { HorizontalShowcase } from '../components/Layouts/HorizontalShowcase';
import { fetchLatestProducts } from '../services/products';
import useCategory from '../hooks/useCategory';

const items = [
  { name: 'Item1', img: "https://m.media-amazon.com/images/I/41srzfxYpXL.jpg" },
  { name: 'Item2', img: "https://m.media-amazon.com/images/I/41srzfxYpXL.jpg" },
  { name: 'Item3', img: "https://m.media-amazon.com/images/I/41srzfxYpXL.jpg" },
  { name: 'Item4', img: "https://m.media-amazon.com/images/I/41srzfxYpXL.jpg" },
  { name: 'Item5', img: "https://m.media-amazon.com/images/I/41srzfxYpXL.jpg" },
]

export default function Home({ latestProducts, error }) {
  const [isToastLatestProducts, setIsToastLatestProducts] = useState(false);
  const [toastLatestProducts, setToastLatestProducts] = useState("");
  const { categories, isToastCategory, toastCategory, onCloseToastCategory } = useCategory();

  useEffect(() => {
    if (!error) return;
    
    setIsToastLatestProducts(true);
    setToastLatestProducts("Something went wrong while fetching the latest products"); 
  }, []);
  
  return (
    <>
      <Head>
        <title>Home | E-Store</title>
      </Head>
      <HeroSection />
      <HorizontalShowcase variant="rounded" label="Categories" items={categories} toast={isToastCategory && toastCategory} onCloseToast={() => onCloseToastCategory(false, "")} />
      <HorizontalShowcase 
        label="Latest" 
        items={latestProducts} 
        toast={isToastLatestProducts && toastLatestProducts} 
        onCloseToast={() => { setIsToastLatestProducts(false); setToastLatestProducts("") }} 
      />
    </>
  )
}

export const getStaticProps = async () => {
  let { products, error } = await fetchLatestProducts();

  if (error) products = [];

  if (!error) error = "";  // otherwise error is "undefined" that is not acceptable in serealized object. 

  return {  
    props: {
      latestProducts: products,
      error,
    },
    revalidate: 1
  }
};