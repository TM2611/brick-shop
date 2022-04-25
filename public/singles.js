import * as _ from './nav.js';
import * as fjs from './fetch.js';
import * as ba from './basket.js';

async function renderAllSingles() {
  const item = document.querySelector('.item');
  if (document.body.contains(item)) {
    // Products already displayed
    const productsDOM = document.querySelectorAll('.item');
    for (const product of productsDOM) {
      product.remove();
    }
  }
  const products = await fjs.fetchSingles();
  const container = document.querySelector('.products-container'); 
  products.forEach(product => {
    const t1 = document.querySelector('#product-template');
    const productTemplate = t1.content.cloneNode(true);
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    // const productDesc = productTemplate.querySelector('#product-desc');
    const addToBasket = productTemplate.querySelector('.add-to-basket');
    const addToBasketBtn = productTemplate.querySelector('.btn-atb');
    addToBasket.dataset.id = product.ProductID;
    addToBasketBtn.addEventListener('click', ba.addToBasket);
    addToBasketBtn.innerText = 'Add to Basket';
    if (ba.basket.has(product.ProductID)) {
      addToBasketBtn.innerText = 'In Basket';
      addToBasketBtn.disabled = true;
    }
    img.src = `${product.ProductImage}`;
    img.alt = `${product.ProductName} Image`;
    productName.textContent = `${product.ProductName}`;
    productPrice.textContent = `£${(product.Price / 100).toFixed(2)}`;
    // productDesc.textContent = `${product.description}`;
    container.append(productTemplate);
  });
}


function setupListeners() {
  document.querySelector('.single-bricks').addEventListener('click', renderAllSingles);
  document.querySelector('#colour-filter').addEventListener('change', renderAllSingles);
  document.querySelector('#sort').addEventListener('change', renderAllSingles);
}

function init(){
  ba.initBasket()
  renderAllSingles()
  setupListeners()
}



window.addEventListener('load', init);
