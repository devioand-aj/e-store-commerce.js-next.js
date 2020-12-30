import React from 'react'

import { Loader, Toast } from '../Common';
import { Filteration } from '../Filter';
import { Items } from '../Products';
import { ProductsWrapper } from '../Pages';
import useProduct from '../../hooks/useProduct';

export default function ProductsShowCase({ label = "Products", products: propProducts }) {
   const { isToast, toast, onSetToast, loading, filteredProducts, isFiltered, products } = useProduct(propProducts);

   return (
      <ProductsWrapper>
         <h1 className="text-center" >{label}</h1>
         <Filteration />
         <div className="mt-8">
            {isToast && <Toast toast={toast} onClose={() => onSetToast(false, "")} />}
            {loading ? <Loader /> : 
             <Items items={isFiltered ? filteredProducts : products} />}
         </div>
      </ProductsWrapper>
   )
}
