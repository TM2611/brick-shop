async function fetchProducts() {
  // eslint-disable-next-line no-undef
  const response = await fetch('/products');
  if (!response.ok) {
    throw response;
  }
  return response.json();
}


async function renderProducts() {
  const products = await fetchProducts();
  console.log(products);
  const productEl = document.querySelector('.products');
  products.forEach(product => {
    productEl.innerHTML += `
    <div class="item">
      <div class= "item-container">
        <div class="item-img">
          <img src="${product.imgSrc}" alt="Image of ${product.name}">
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


function setupListeners() {
  document.querySelector('.our-products').addEventListener('click', renderProducts);
}

async function init() {
  await setupListeners();
}

window.addEventListener('load', init);
