import { addItemServices, deleteCartItemServices, fetchCartServices, updateCartServices } from '../../services/cart';
import { fetchAllProducts } from '../../services/products';

describe('/services/cart', () => {
   let cart;
   let products;
   let productId;
   let quantity = 1;

   beforeEach(async () => {
      const { cart: fetchedCart } = await fetchCartServices();

      const { products: fetchedProducts } = await fetchAllProducts();
      productId = fetchedProducts[0].id;

      cart = fetchedCart;
      products = fetchedProducts;
      // jest.setTimeout(60000000);
    });

   it('should return cart object if cart is successfully fetched', async () => {
      expect(cart).not.toBeUndefined();
   });

   it('should return updated cart if item is added successfully', async () => {
      const { cart: updatedCart } = await addItemServices(productId, quantity);

      expect(updatedCart).toHaveProperty("success", true)
   });

   it('should return updated cart if an item quantity is updated successfully', async () => {
      const { cart } = await addItemServices(productId, quantity);

      const { cart: updatedCart } = await updateCartServices(cart.line_item_id, { quantity: quantity + 1 });

      expect(updatedCart).toHaveProperty("success", true)
   });

   it('should return updated cart if an item quantity is updated successfully', async () => {
      const { cart } = await addItemServices(productId, quantity);

      const { cart: updatedCart } = await deleteCartItemServices(cart.line_item_id);

      expect(updatedCart).toHaveProperty("success", true)
   });

   it('should return error of 422 if item does not exist', async () => {
      productId = "1";
      const { error } = await addItemServices(productId, quantity);

      expect(error).toBeTruthy()
   });
})
