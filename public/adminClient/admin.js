import * as fjs from '../fetch.js';

export async function listProducts(){
  const t1 = document.querySelector('.stock-server-response-template');
  const responseContainer = document.querySelector('.stock-list-container');
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
  if(window.location.href.indexOf("stock.html") != -1){
    for (const container of productContainers) {
      container.addEventListener('click',validateSelection) 
    }
  }
  else if(window.location.href.indexOf("remove.html") != -1){
    for (const container of productContainers) {
    container.addEventListener('click',removeProduct) 
    }
  }
}

//Remove product functions
async function removeProduct(e){
  const removeID = e.target.querySelector('.stock-product-id').dataset.id
  const prompt = `You are about to delete product:\n${removeID}\nThis action cannot be undone.`
  if (confirm(prompt) == true) {
    const result = await fjs.fetchRemoveProduct(removeID)
    const el = document.querySelector('.stock-update-response')
    el.textContent = `${result.ProductName} removed from stock (id: ${result.ProductID})`
    e.target.remove()
  }
}



// Stock Management functions

export function selectedOption(){
  const stockOptions = document.querySelector('.stock-options');
  for (const option of stockOptions.children){
    if (option.classList.contains('stock-option-selected')){
      return option
    }
  }
  return false
}

async function validateSelection(e){
  if (!selectedOption()){
    alert('Select stock management option.')
    return
  }
  const id = e.target.querySelector('.stock-product-id').dataset.id
  const option = document.querySelector('.stock-option-selected').classList[0];
  const input = document.querySelector('#quantity-input')
  setupQuantityField(option, id)
}

function setupQuantityField(option, id){
  const form = document.querySelector('.quantity-input-form');
  const input = document.querySelector('#quantity-input');
  form.classList.remove('hide');
  form.dataset.id = id;
  let label = input.labels[0]
  if(option === 'add-stock-btn'){
    label.textContent = "Please enter the number of units to add";
    form.dataset.option = 'add'
    }
  else if(option === 'remove-stock-btn'){
    label.textContent = "Please enter the number of units to remove:"
    form.dataset.option = 'remove'
  }
  else if (option === 'set-stock-btn'){
    label.textContent = "Please enter the number of units to set to:"
    form.dataset.option = 'set'
  }
}

