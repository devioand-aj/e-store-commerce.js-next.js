import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri'
import Link from 'next/link';

import useCart from '../../hooks/useCart';
import { Loader } from '../Common';
import useProduct from '../../hooks/useProduct';

export default function Card({ item, onDelete }) {
   const { onIsProductAvailable } = useProduct();
   const { onUpdateCart } = useCart();
   const [quantityState, setQuantityState] = useState(0);
   const [loading, setLoading] = useState(false);
   const [productQuantity, setProductQuantity] = useState(0);

   const { id: itemId, product_id: productId, media, permalink, product_name, quantity, price, line_total } = item;

   useEffect(() => {
      setQuantityState(quantity);
      getProductQuantity(permalink);

      return () => {
         setLoading(false);
      }
   }, []);

   const getProductQuantity = async (permalink) => {
      const { quantity, error } = await onIsProductAvailable(permalink);

      if (error) return;

      setProductQuantity(quantity);
   }

   // Handlers
   const onUpdate = async (addIn) => {
      let prevQuantity = quantityState;
      let updatedQuantity = quantityState + addIn;

      if (updatedQuantity < 0) return;

      setLoading(true);
      setQuantityState(updatedQuantity)
      const { cart } = await onUpdateCart(itemId, { quantity: updatedQuantity });
      setLoading(false);

      if (!cart) setQuantityState(prevQuantity);
   }

   return (
      <div className="bg-secondary my-2 px-4 flex flex-col">
         <div className="flex items-center">
            <ItemImg img={media.source} name={product_name} />
            <div className="flex-1 py-2">
               <ItemDescription name={product_name} price={price} permalink={permalink} />
               {quantity && <ItemQuantity productQuantity={productQuantity} quantity={quantityState} onUpdate={onUpdate} />}
               {line_total && <ItemTotal total={line_total} loading={loading} />}
            </div>
            <ItemDeleteIcon 
               onClick={() => onDelete({ productId, itemId })} // this delete button is used in two places (1- Cart, 2- Favourite) in cart itemId is used in favourite productid is used
            />
         </div>
      </div>
   )
}

function ItemImg({ img, name }) {
   return (
      <div className="mr-6 w-20 h-20 rounded-full overflow-hidden">
         <img className="w-full h-full object-cover" src={img} alt={name}/>
      </div>
   )
}

function ItemDescription({ name, price, permalink }) {
   return (
      <>
         <Link href={`/products/${permalink}`} passHref>
            <h1 className="cursor-pointer font-medium select-none underline my-1">
               <a>{name}</a>
            </h1>
         </Link>
         <h2 className="my-1">Price: <span>{price.formatted_with_code}</span></h2>
      </>
   )
} 

function ItemQuantity({ quantity, onUpdate, productQuantity }) {
   return (
      <div className="flex pb-2 border-b border-gray-300">
         <h3 className="my-1 mr-4">Quantity: </h3>
         <div className="flex justify-center">
            <button 
               className="bg-gray-300 focus:outline-none active:scale-95 transform px-4 rounded-sm text-2xl"
               onClick={() => onUpdate(-1)}   
            >-
            </button>
            <h2 className="flex items-center mx-4">{quantity}</h2>
            {quantity < productQuantity && <button 
               className="bg-gray-300 focus:outline-none active:scale-95 transform px-4 rounded-sm text-2xl"
               onClick={() => onUpdate(+1)} 
            >
               +
            </button>}
         </div>
      </div>
   )
}

function ItemTotal({ total, loading }) {
   return (
      <div className="flex justify-between py-2">
         <h3 className="text-xl sm:text-2xl">Total: 
            <span className="text-xl sm:text-2xl font-bold ml-2">{total.formatted_with_code}</span>
         </h3>
         <span className="">{loading && <Loader size="sm" />}</span>   
      </div>
   )
}

function ItemDeleteIcon({ onClick  }) {
   return (
      <div className="flex ml-6 justify-center items-center ">
         <RiDeleteBin5Line onClick={onClick} className="active:scale-90 transform cursor-pointer select-none" size="25" />
      </div>
   )
}
