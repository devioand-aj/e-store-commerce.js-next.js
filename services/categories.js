import {commerce} from '../lib/commerce';
import { getImage } from './images';


export async function getCategoriesServices() {
   try {
      const { data: categories } = await commerce.categories.list();
      
      //Assigning suitable images with each category
      const categoriesWithImage = await Promise.all(categories.map(async (category) => {
         return { ...category, img: await getImage(category.description) };
      }))

      return { categories: categoriesWithImage };
   } catch (err) {
      console.log('getCategoriesServices: ',{ error: err });
      return { error: err.message };
   }
}

export async function getCategoryBySlug(slug) {
   try {
      const categorySlug = slug;

      const category = await commerce.categories.retrieve(categorySlug, { type: 'slug' });

      return { category };
   } catch (err) {
      console.log('getCategoryBySlug: ', { error: err });
      return { error: err.message };
   }
}