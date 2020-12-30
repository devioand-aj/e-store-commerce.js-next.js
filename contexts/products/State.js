import React, { useEffect, useReducer } from 'react'
import _ from 'lodash';

import Context from './context';
import Reducer from './reducer';
import { 
   SET_PRODUCTS, 
   SET_LOADING, 
   SET_TOAST,
   SET_SEARCH_QUERY,
   SET_FILTERATION,
   SET_SORT_QUERY
} from '../types';
import { searcher } from '../../lib/fuzzy-search';
import { fetchProduct } from '../../services/products';

export default function ProductState({ children }) {
   const initialState = {
      products: [],
      toast: '',
      loading: false,
      isToast: false,
      searchQuery: '',
      sortQuery: '',
      latestProducts: [],
      filteration: {
         isFiltered: false,
         filteredProducts: [],
      }
   }

   const [state, dispatch] = useReducer(Reducer, initialState);
   
/*****  State Management ******/
   const { sortQuery, products, searchQuery, filteration: { isFiltered, filteredProducts } } = state;

   useEffect(() => {
      if (sortQuery === "date") return setProductsDispatch(_.reverse(_.sortBy(products, ['created'])));

      if (sortQuery === "name") return setProductsDispatch(_.sortBy(products, ['name']));

      if (sortQuery === "price") return setProductsDispatch(_.sortBy(products, ['price.raw']));
   }, [sortQuery])

   useEffect(() => {
      if (searchQuery) return getSearchFilteredResult(products, ["name"], searchQuery);

      setFilterationDispatch(); //DEFAULT parameters;
   }, [searchQuery]);

   useEffect(() => {
      if (!isFiltered) return setToastDispatch(false, "");

      if (filteredProducts.length === 0) return setToastDispatch(true, 'Product not found!');

      setToastDispatch(false, "");
   }, [filteredProducts])

   // useEffect helpers
   function getSearchFilteredResult(products, keys, query) {
      const result = searcher(products, keys, query);
      return setFilterationDispatch(true, result);
   }


/***** Reducer Management  ******/
   const setDispatch = (type, payload) => dispatch({ type, payload })

   //factorixations using "setDispatch" method
   const setLoadingDispatch = (isLoading = true) => setDispatch(SET_LOADING, isLoading);
   const setProductsDispatch = (products) => setDispatch(SET_PRODUCTS, products); 
   const setToastDispatch = (isToast, toast) => setDispatch(SET_TOAST, { isToast, toast }); 
   const setFilterationDispatch = (isFiltered = false, filteredProducts = []) => setDispatch(SET_FILTERATION, { isFiltered, filteredProducts });
   const setSearchQueryDispatch = (query) => setDispatch(SET_SEARCH_QUERY, query);
   const setSortQueryDispatch = (query) => setDispatch(SET_SORT_QUERY, query);

/***** Context Handlers interact with react  ******/
   const handleFetchProducts = async (products) => {
      setProductsDispatch(products);  
   }

   const handleSetToast = (isToast, toast) => {
      setToastDispatch(isToast, toast);
   }

   const handleSearchQueryChange = (query) => {
      setSearchQueryDispatch(query);
   }

   const handleSortQueryChange = (query) => {
      setSortQueryDispatch(query);
   }

   const handleIsProductAvailable = async (permalink) => {
      const { product, error } = await fetchProduct(permalink);
      if (error) return { error };

      const isAvailable = product.quantity < 1 ? false : true;

      return { isAvailable, quantity: product.quantity }
   }

   return (
      <Context.Provider
         value={{
            loading: state.loading,
            isToast: state.isToast,
            toast: state.toast,
            products: state.products,
            latestProducts: state.latestProducts,
            filteredProducts: state.filteration.filteredProducts,
            isFiltered: state.filteration.isFiltered,
            searchQuery: state.searchQuery,
            onSearchQueryChange: handleSearchQueryChange,
            sortQuery: state.sortQuery,
            onSortQueryChange: handleSortQueryChange,
            onSetToast: handleSetToast,
            onFetchProducts: handleFetchProducts,
            onIsProductAvailable: handleIsProductAvailable,
         }}
      >
         {children}
      </Context.Provider>
   )
}
