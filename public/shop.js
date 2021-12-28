import { products } from './products.js';

const productEl = document.querySelector('.products');

function renderProducts() {
  products.forEach(product => {
    productEl.innerHTML += `
    <div class="item">
      <div class= "item-container">
        <div class="item-img">
          <img src="${product.imgSrc}" alt="">
        </div>
        <div class="desc">
          <h2>${product.name}</h2>
          <h2>${product.price}</h2>
          <p>
            ${product.description}
          </p>
        </div>
        <div class="add-to-basket">
          <i class="far fa-plus-square"></i>
        </div>
      <div>
    </div>
    `;
  });
}

renderProducts();
