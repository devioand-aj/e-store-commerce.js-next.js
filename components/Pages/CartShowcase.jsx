import React from 'react'
import Link  from 'next/link'

import { BottomBar, Items } from '../Cart';
import { Loader, Toast } from '../Common';

export default function CartShowcase({
   isToast, toast, onToastClose, loading, itemsCount, items, total, loadingOnUpdate, heading, onDelete
}) {
   return (
      <>
         {isToast && <Toast toast={toast} onClose={onToastClose} />}
         {loading ? <Loader /> : <>
            {itemsCount > 0 && <>
               <h1 className="text-center mb-7">{heading}</h1>
               <Items items={items} onDelete={onDelete} />
               {total && <BottomBar 
                  total={total} 
                  loading={loadingOnUpdate}
               />}
            </>}
         </>}
         {(!loading && itemsCount === 0) && <h1 className="underline text-center mt-4">
            <Link href="/products"><a>Go Back to Products</a></Link>  
         </h1>}  
      </>
   )
}
