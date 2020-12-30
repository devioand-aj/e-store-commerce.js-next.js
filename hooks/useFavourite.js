import { useContext } from 'react'

import { favouriteContext } from '../contexts/favourites';

export default function useFavourite() {
   return useContext(favouriteContext);   
}
