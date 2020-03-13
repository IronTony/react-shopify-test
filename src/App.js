import React, { useEffect, useState } from 'react';
import Client from 'shopify-buy';
import logo from './logo.svg';
import './App.css';

// Initializing a client
const client = Client.buildClient({
  domain: 'sheep-sweater.myshopify.com',
  storefrontAccessToken: '13d7f13087b3d8d13b3bf2aaf69d057b'
});

function App() {
  const [checkoutId, setCheckoutId] = useState('');

  useEffect(() => {
    client.checkout.create().then((res) => {
      console.log('checkout: ', res);
      setCheckoutId(res);
    });
  }, [])

  useEffect(() => {
    client.product.fetchAll().then((res) => {
      console.log('product: ', res);
    });
  })

  const addVariantToCart = (variantId, quantity) => {
    const graphqlApiId = window.btoa(`gid://shopify/ProductVariant/${variantId}`)
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const newCheckoutId = checkoutId.id;

    console.log('===> ', graphqlApiId, lineItemsToAdd, newCheckoutId);
    

      return client.checkout.addLineItems(newCheckoutId, lineItemsToAdd).then(res => {
        console.log('checkout: ', res);
      });
  }

  const openCheckout = () =>  {
    if (checkoutId.webUrl) {
      window.open(checkoutId.webUrl);
    }
    // console.log('==> ', checkoutId);
    
  } 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <button onClick={() => addVariantToCart('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTY0NjE0NDEwMjQ0Ng==', 1)}>Add Variant to Checkout</button>
        <button onClick={() => openCheckout()}>Shopify</button>
      </div>
    </div>
  );
}

export default App;
