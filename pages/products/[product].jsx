import { useRouter } from 'next/router';

import { fetchAllProducts, fetchProduct } from '../../services/products';
import { ProductDetail } from '../../components/Products';
import { Loader, Toast } from '../../components/Common';

export default function Product({ product, error }) {
   const router = useRouter();

   if (error) return <Toast className="mt-6" isCloaseAble={false} toast="Something went wrong wrong!!!" />
   if (router.isFallback) return <Loader size="sm" className="mt-10"/>;
   return (
      <div className="container p-0 mt-4 sm:mt-6">
         <ProductDetail product={product} />
      </div>
   )
}

export async function getStaticProps({ params }) {
   let { product, error } = await fetchProduct(params.product);
   if (!error) error = null;

   
   if (!product) {
      return {
        notFound: true,
      }
   }

   return {
      props: {
         product,
         error
      },
      revalidate: 1
   }
}

export async function getStaticPaths() {
   let { products, meta, error } = await fetchAllProducts();

   const paths = products.map(product => ({
      params: { product: product.permalink }
   }))

   return {
      paths,
      fallback: true
   }
}
