import { commerce } from '../lib/commerce';

export async function addItemServices(id, quantity) {
   try {
      const cart = await commerce.cart.add(id, quantity);

      return { cart };
   } catch (err) {
      console.log({ err });
      return { error: err.message }
   }
}

export async function fetchCartServices() {
   try {
      const cart = await commerce.cart.refresh();
      
      return { cart };
   } catch (err) {
      console.log('fetchCartServices: ', { err });
      return { error: err.message };
   }
}

export async function updateCartServices(id, body) {
   try {
      const cart = await commerce.cart.update(id, body);

      return { cart };
   } catch (err) {
      console.log('updateCartServices: ', { err: err });
      return { error: err.message };
   }
}

export async function clearCartServices() {
   try {
      const cart = await commerce.cart.empty();

      return { cart };
   } catch (err) {
      console.log('clearCartServices: ', { error: err });
      return { error: err.message }
   }
}

export async function deleteCartItemServices(id) {
   try {
      const cart = await commerce.cart.remove(id)

      return { cart };
   } catch (err) {
      console.log('deleteCartItemServices: ',{ error: err })
      return { error: err.message };
   }
}

export async function refreshCartServices() {
   try {
      const refreshedCart = await commerce.cart.refresh();

      return { refreshedCart }
   } catch (err) {
      console.log('refreshCartServices: ', { error: err });
      return { error: err.message };
   }
}