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
  products.forEach(product => {
    const t1 = document.querySelector('#products');
    const productTemplate = t1.content.cloneNode(true); // Clone necessary?
    const img = productTemplate.querySelector('#product-img');
    const productName = productTemplate.querySelector('#product-name');
    const productPrice = productTemplate.querySelector('#product-price');
    const productDesc = productTemplate.querySelector('#product-desc');
    const basketBtn = productTemplate.querySelector('.btn-atb');
    basketBtn.addEventListener('click', addToBakset);
    img.src = `${product.imgSrc}`;
    img.alt = `${product.imgSrc}`;
    productName.textContent = `${product.name}`;
    productPrice.textContent = `${(product.price / 100).toFixed(2)}`;
    productDesc.textContent = `${product.description}`;
    document.body.append(productTemplate);
  });
}


function addToBakset() {
  console.log('Added to basket');
}

function setupListeners() {
  document.querySelector('.our-products').addEventListener('click', renderProducts);
}

async function init() {
  await setupListeners();
}

window.addEventListener('load', init);
