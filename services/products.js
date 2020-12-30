import { commerce } from '../lib/commerce';

export async function fetchAllProducts(option) {

   try {
      let res;

      if (option) res = await commerce.products.list(option);
      else res = await commerce.products.list();

      const products = res.data;
      products.reverse();
   
      return { products, meta: res.meta };
   } catch (err) {
      console.log({ err })
      return { error: err.message };
   }
}

export async function fetchLatestProducts(option = { limit: 3 }) {
   const { limit } = option;
 
   try {
      let { data: products } = await commerce.products.list();
      
      products.reverse();
      products = products.slice(0, limit)

      return { products }
   } catch (err) {
      console.log('FetchLatestProducts: ', { error: err })
      return { error: err.message }
   }
}

export async function fetchProduct(id, msg) {
   try {
      const productPermalink = id;

      const product = await commerce.products.retrieve(productPermalink, { type: 'permalink' });

      return { product };
   } catch (err) {
      console.log('FetchProductServices: ', { error: err });
      return { error: err.message };
   }
}

export async function fetchProductsByCategory(slug) {
   try {
      const categorySlug = slug;

      const res = await commerce.products.list({ category_slug: categorySlug });

      return { products: res.data };
   } catch (err) { 
      console.log('fetchProductsByCategory: ', { error: err });
      return { error: err.message };
   }
}