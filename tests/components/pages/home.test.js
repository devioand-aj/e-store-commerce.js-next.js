// import React from 'react'
import { render, screen  } from '@testing-library/react';
import Home from '../../../components/Cart/Card';
import useCart from '../../../hooks/useCart';
import useProduct from '../../../hooks/useProduct';


// // const HelloWorld = () => <h1>Hello World</h1>
// const { debug } = render(<HelloWorld />)
// debug();

describe('/pages/index.jsx', () => {
   it("should return home page", () => {
      const { onIsProductAvailable } = useProduct();
      const { onUpdateCart } = useCart();

      const { debug } = render(<Home />);
      debug();
   })
})
