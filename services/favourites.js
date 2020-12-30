import store from 'store-js';

export async function fetchFavouriteItemsServices() {
   try {
      let storedItems = await store.get('favouriteItems') || [];

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function setFavouriteItemServices(item) {  
   try {
      const items = await store.get('favouriteItems') || [];
      items.push(item);

      const storedItems = await store.set('favouriteItems', items);
      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}

export async function removeFavouriteItemServices(id) {
   try {
      let storedItems = await store.get('favouriteItems') || [];
      if (storedItems.length === 0) return { storedItems };

      const restItems = storedItems.filter(item => item.product_id !== id);
      storedItems = await store.set('favouriteItems', restItems)

      return { storedItems };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}