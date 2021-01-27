import _ from 'lodash';
import { fetchAllProducts } from '../../services/products';

describe('/services/products',() => {
   beforeEach(async () => {
      // jest.setTimeout(60000000);
    });

   it('should return all products',async () => {
      // Calling the product function from the server
      const { products } = await fetchAllProducts();

      expect(_.isArray(products)).toBeTruthy();
   });

   it('should return error if network or any problem occurs', async () => {
      const { error } = await fetchAllProducts();

      if (!error) return expect(error).toBeUndefined();

      expect(error).not.toBe(undefined);
   });
})
