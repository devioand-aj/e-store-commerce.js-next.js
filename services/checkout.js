import { commerce } from '../lib/commerce';

export async function getCheckoutTokenByCartIdServices(cartId) {
   try {
      const checkoutToken = await commerce.checkout.generateTokenFrom('cart', cartId);

      return { checkoutToken };
   } catch (err) {
      console.log('getCheckoutTokenByCartIdServices: ', { error: err });
      return { error: err.message }
   }
} 

export async function getCheckoutTokenByProductIdServices(productId) {
   try {
      const checkoutToken = await commerce.checkout.generateTokenFrom('product_id', productId);

      return { checkoutToken };
   } catch (err) {
      console.log('getCheckoutTokenByProductIdServices: ', { error: err });
      return { error: err.message }
   }
} 

export async function getCapturedOrderServices(token, userDetail) {
   const orderData = {
      line_items: token.live.line_items,
      customer: {
         firstname: userDetail.firstName,
         lastname: userDetail.lastName,
         email: userDetail.email,
      },
      extrafields:{
         extr_AmOVKl48VlprRP: userDetail.phone
      },
      shipping: {
         name: userDetail.firstName + userDetail.lastName,
         street: userDetail.address,
         town_city: userDetail.city,
         county_state: 'PK-IS',
         postal_zip_code: '94103',
         country: 'PK',
      },
      fulfillment: {
         // The shipping method ID for "USPS Ground" (for example)
         // You can use commerce.checkout.getShippingOptions() to get a list
         shipping_method: "ship_BkyN5Ydg7o0b69",
      },
      payment: {
         // Test Gateway is enabled by default, and is used when you submit orders with
         // your sandbox API key
         gateway: 'test_gateway',
         card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '2023',
            cvc: '123',
            postal_zip_code: '94103',
         },
      },
   };

   try {
      const capturedOrder = await commerce.checkout.capture(token.id, orderData);

      return { capturedOrder };
   } catch (err) {
      console.log({ error: err });
      return { error: err.message };
   }
}
