import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import _ from 'lodash';

import { Button } from '../Common';
import useCart from '../../hooks/useCart';
import useFavourite from '../../hooks/useFavourite';
import useProduct from '../../hooks/useProduct';

export default function Card({ item }) {
   const [isFavourite, setIsFavourite] = useState(false);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const { onAddItemToCart } = useCart();
   const { onIsProductAvailable } = useProduct();
   
   const { favouriteItems, onSetFavouriteItem, onRemoveFavouriteItem } = useFavourite();

   const { id, name, permalink, price, media } = item;

   useEffect(() => {
      setIsFavourite(_.some(favouriteItems, { product_id: id }));
   }, [favouriteItems])

   const handleAddToFavourite = async () => {
      // if item is already selected and need to be un-selected
      if (isFavourite) return onRemoveFavouriteItem(id);
      
      // if item is not selected as favourite
      const item = { product_id: id, product_name: name, permalink, price, media }; // keys should be same as cart items bcz cart component is used in favourite page
      onSetFavouriteItem(item);
   }

   const handleAddToCart = async () => {
      setLoading(true);

      const { isAvailable, error: isAvailableError } = await onIsProductAvailable(permalink);

      if (isAvailableError) return setTimeout(() => {
            setLoading(false);
      }, 1000)

      if (!isAvailable) {
         setError("Out of stock");

         return setTimeout(() => {
            setLoading(false);
         }, 500);
      }

      const { error } = await onAddItemToCart(id, 1);
      
      if (error) return setTimeout(() => {
         setLoading(false);
      }, 500);

      setLoading(false);

      () => {
         setLoading(false);
      }
   };

   return (
      <div className="w-full sm:w-72 h-82 p-4">
         <CardImg img={media.source} name={name} />
         <CardDescription 
            permalink={permalink}
            name={name}
            price={price}
            loading={loading}
            handleAddToCart={handleAddToCart}
            handleAddToFavourite={handleAddToFavourite}
            isFavourite={isFavourite}
            error={error}
         />
      </div>
   )
}

function CardImg({ img, name }) {
   return (
      <div className="relative overflow-hidden bg-center h-70%">
         <img className="w-full h-full object-cover" src={img} alt={name}/>
      </div>
   )
}

function CardDescription({ error, permalink, name, price, loading, handleAddToCart, handleAddToFavourite, isFavourite }) {
   return (
      <div className="bg-secondary h-30% px-4 py-2">
         <h2 
            className="text-lg font-medium font-montserrat overflow-hidden overflow-ellipsis whitespace-nowrap"
         >
            <Link href={`/products/${permalink}`} passHref>
               <a>{name}</a>               
            </Link>
         </h2>
         <h3 className="">Price: <span className="font-semibold text-base">{price.formatted_with_code}</span></h3>
         <div className="mt-2 flex flex-row items-center">
            <div className="p-1 mr-2 flex-1 flex transition-width">
               {error ? 
                  <Button label={error} className="bg-gray-300 text-black" disabled={true} /> :
                  <Button label="Add to Cart" loading={loading} onClick={handleAddToCart} />
               }
            </div>
            <button onClick={handleAddToFavourite} className="focus:outline-none active:transform active:scale-90" >
               {isFavourite ? <BsHeartFill color="#EF4444" size={25} /> : <BsHeart  size={25} />}
            </button>
         </div>
      </div>
   )
}
