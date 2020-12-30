import "../styles/global.css"
import _ from 'lodash'

import { Navbar } from '../components/Navbar/index'
import { CartState } from '../contexts/cart';
import { ProductState } from '../contexts/products';
import { GlobalState } from '../contexts/global';
import { FavouriteState } from '../contexts/favourites';
import { getCategoriesServices } from '../services/categories';
import { CheckoutState } from '../contexts/checkout';

function MyApp({ Component, pageProps, appProps }) {
  return (
    <>
      <CheckoutState>
        <FavouriteState>
          <ProductState>
            <CartState>
              <GlobalState props={appProps}>
                <Navbar />
                <Component { ...appProps } {...pageProps} />
              </GlobalState>
            </CartState>
          </ProductState>
        </FavouriteState>
      </CheckoutState>
    </>
  )
}

MyApp.getInitialProps = async () => {
  let { categories, error } = await getCategoriesServices();

  if (error) categories = [];
  if (!error) error = ""

  return {
    appProps: {
      categories: {
        items: categories,
        error
      },
    }
  }
}

export default MyApp
