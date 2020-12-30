import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash';
import { useRouter } from 'next/router';

import { Button } from '../Common'
import useCart from '../../hooks/useCart';
import { HorizontalShowcase } from '../Layouts/HorizontalShowcase';
import useCheckout from '../../hooks/useCheckout';
import useProduct from '../../hooks/useProduct';

const dummyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

export default function ProductDetail({  
      product: { 
         id,
         name,
         description, // description is dummy text yet, will be changed later
         price: { formatted_with_code: price },
         media: { source: img },
         related_products: relatedProducts,
         permalink
      },
   }) {
   const { onIsProductAvailable } = useProduct();
   const [isProductAvailable, setIsProductAvailable] = useState(true);

   useEffect(() => {
      getIsProductAvailable(permalink);
   }, [permalink]);

   const getIsProductAvailable = async (permalink) => {
      const { isAvailable } = await onIsProductAvailable(permalink);

      setIsProductAvailable(isAvailable);
   }

   return (
      <div className="px-0 mb-12">
         <div>
            <h1 className="text-center">{name}</h1>
         </div>
         <div className="md:mt-8 mt-5 flex justify-evenly flex-wrap">
            <ItemDetail id={id} img={img} imgAlt={name} price={price} soldOut={!isProductAvailable} />
            <ItemDescription description={description} />
         </div>
         {relatedProducts.length > 0 && <ItemRelatedProducts relatedProducts={relatedProducts} />}
      </div>
   )
}

function ItemDescription({ description }) {
   const [isTruncate, setIsTruncate] = useState(true);
   const MAX_LENGTH = 300;

   description = dummyText;

   const setDescription = (isDesc, desc) => {
      if (!isDesc) return desc;
      return _.truncate(desc, { length: MAX_LENGTH, omission: '', separator: ' ' })
   }

   const setDescStatus = (desc) => {
      let msg = "";
      if (desc.length <= MAX_LENGTH) return msg;

      return isTruncate ? "see more..." : "see less";
   }

   return (
      <div className="md:w-35r flex flex-col p-8 justify-start text-gray-600 font-medium tracking-wider text-lg">
         <div className="">
            <h2 className="text-center text-black">Description</h2>
            <div className="mt-2 text-lg">
               {setDescription(isTruncate, description)}
               <span 
                  onClick={() => setIsTruncate(!isTruncate)} 
                  className="select-none text-black text-xs underline ml-1 cursor-pointer">
                  {setDescStatus(description)}
               </span>
            </div> 
         </div>
      </div>
   )
}

function ItemDetail({ id, img, imgAlt, price, soldOut }) {
   const router = useRouter();
   const { onGenCheckoutToken } = useCheckout();
   const { onAddItemToCart } = useCart();
   const [loading, setLoading] = useState(false);
   const [checkoutLoading, setCheckoutLoading] = useState(false);

   const handleAddToCart = async () => {
      setLoading(true);

      const { error } = await onAddItemToCart(id, 1);
      
      if (error) return setTimeout(() => {
         setLoading(false);
      }, 1000);

      setLoading(false);

      () => {
         setLoading(false);
      }
   };

   const handleCheckout = async () => {
      setCheckoutLoading(true);

      const { error } = await onGenCheckoutToken({ productId: id })

      if (error) {
         console.log('ProductDetial :: handleCheckout : ', error);
         setCheckoutLoading(false)
      }

      setCheckoutLoading(false);
      router.push("/checkout");
   }

   return (
      <div className="sm:w-35r w-full bg-secondary">
         <div className="h-30r">
            <img className="h-full w-full object-cover p-2" src={img} alt={imgAlt}/>
         </div>
         <div className="p-4 mx-4">
            <div className="my-4">
               <h1>Rs. {price}</h1>
               <div className={`${soldOut ? "bg-primary" : "bg-green-500" } text-white w-max px-2 py-1 my-2`}>
                  {soldOut ? 'Out of stock' : 'Stock available'}
               </div>
            </div>
            {!soldOut && <Button onClick={handleAddToCart} loading={loading} className="bg-gray-300" variant="secondary" label="Add to cart" />}
            {!soldOut && <Button onClick={handleCheckout} loading={checkoutLoading} className=" mt-2" label="Buy it now" />}
         </div>
      </div>
   )
}

function ItemRelatedProducts({ relatedProducts }) {
   return (
      <HorizontalShowcase 
         label="You may like these" 
         items={relatedProducts} 
         variant="portrait"
      />
   )
}