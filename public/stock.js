import * as fjs from './fetch.js';

async function listProducts(){
  const t1 = document.querySelector('.stock-server-response-template');
  const responseContainer = document.querySelector('.stock-server-response-container');
  const products = await fjs.fetchAllProducts();
  for (const product of products) {
    const stockListTemplate = t1.content.cloneNode(true);
    // const img = stockListTemplate.querySelector('.stock-product-img');
    const name = stockListTemplate.querySelector('.stock-product-name');
    const quantity = stockListTemplate.querySelector('.stock-product-qty');
    const id = stockListTemplate.querySelector('.stock-product-id');
    // img.src = product.ProductImage;
    // img.alt = `${product.ProductName} Image`;
    id.textContent = product.ProductID
    id.dataset.id = product.ProductID;
    name.textContent = product.ProductName;
    quantity.textContent = product.UnitsInStock;
    responseContainer.append(stockListTemplate);
  }
  const productContainers = document.querySelectorAll('.stock-product-container');
  for (const container of productContainers) {
    container.addEventListener('click',manageStock) 
  }
}


function selectOption(e){
  const option = selectedOption()
  if(option){
    option.classList.remove('stock-option-selected')
  }
  e.target.classList.add('stock-option-selected')
}
  

function selectedOption(){
  const stockOptions = document.querySelector('.stock-options');
  for (const option of stockOptions.children){
    if (option.classList.contains('stock-option-selected')){
      return option
    }
  }
  return false
}

async function manageStock(e){
  if (!selectedOption()){
    alert('Select stock management option.')
    return
  }
  const id = e.target.querySelector('.stock-product-id').dataset.id
  const option = document.querySelector('.stock-option-selected').classList[0];
  debugger
  await updateStock(id,option)
}

async function updateStock(id, option){
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }
  if(option === 'add-stock-btn'){
    let quantity = prompt("Please enter the number of units to add:");
    if (quantity != null) {
      const result = await fjs.fetchStockIncrease(id,quantity);
    }
  }
  else if(option === 'remove-stock-btn'){
    let quantity = prompt("Please enter the number of units to remove:");
    if (quantity != null) {
      const result = await fjs.fetchStockDecrease(id,quantity);
    }
  }
  else if(option === 'set-stock-btn'){
    let quantity = prompt("Please enter the number of units:");
    if (quantity != null) {
      const result = await fjs.fetchSetStock(id,quantity)
    }
  }

}

function setupListeners() {
  document.querySelector('.stock-product-container');
  const so = document.querySelectorAll('.stock-options');
  for (const option of so) {
    option.addEventListener('click',selectOption)
  }

}


async function init() {
  setupListeners();
  await listProducts()
}

window.addEventListener('load', init);
