import { HorizontalShowcase } from '../components/Layouts/HorizontalShowcase';
import { fetchLatestProducts } from '../services/products';

export default function NotFound({ latestProducts, error }) {
   return (
      <div className="container"> 
         <h1 className="text-center my-8">Page not found!</h1>
         {!error && <HorizontalShowcase 
               label="You may interested in!" 
               items={latestProducts} 
            />}
      </div>
   )
}

export async function getStaticProps() {
   let { products, error } = await fetchLatestProducts();

   if (error) products = [];
 
   if (!error) error = null  // otherwise error is "undefined" that is not acceptable in serealized object. 
 
   return {  
     props: {
       latestProducts: products,
       error,
     },
     revalidate: 1
   }
}
