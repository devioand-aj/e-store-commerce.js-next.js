import { useEffect } from 'react';

import useFavourite from '../hooks/useFavourite'
import { FavouriteWrapper } from '../components/Pages';
import CartShowcase from '../components/Pages/CartShowcase';

export default function favourite({ heading }) {
   const { onIsFavouriteEmpty, favouriteItems, loading, toast, isToast, onSetToast, countFavouriteItems, onRemoveFavouriteItem } = useFavourite();

   useEffect(() => {
      onIsFavouriteEmpty();

      return () => {
         onSetToast(false, "")
      }
   }, [])

   return (
      <FavouriteWrapper>
         <CartShowcase 
            heading={heading || "Favourites"}
            isToast={isToast}
            toast={toast}
            onToastClose={() => onSetToast(false, "")}
            loading={loading}
            itemsCount={countFavouriteItems}
            items={favouriteItems}
            onDelete={({ productId }) => onRemoveFavouriteItem(productId)}
         />
      </FavouriteWrapper>
   )
}

export async function getStaticProps() {
   return {
     props: {
        heading: "Favourites" // just to make this page static bcz due to using "getInitialApp" all pages are not static by default
     },
   }
 }