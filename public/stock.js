import * as fjs from './fetch.js';
import * as main from './main.js';

async function listProducts(){
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
  const input = document.querySelector('#quantity-input')
  setupQuantityField(option, id)
  // const updatedStock = await updateStock(id,option)
  // if(updatedStock){
  //   const quantity = e.target.querySelector('.stock-product-qty')
  //   quantity.textContent = updatedStock;
  // }
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


async function updateStock(){
  const form = document.querySelector('.quantity-input-form');
  const input = document.querySelector('#quantity-input');
  const id = form.dataset.id
  const quantity = input.value;
  const resElement = document.querySelector('.stock-update-response');
  if(form.dataset.option === 'add'){
    debugger
    const result = await fjs.fetchStockIncrease(id,quantity);
    resElement.textContent = `Update Succesful, new quantity: ${result.newStock}` //TODO: why not work at end
  }
  else if(form.dataset.option === 'remove'){
    const result = await fjs.fetchStockDecrease(id,quantity);
    resElement.textContent = `Update Succesful, new quantity: ${result.newStock}`
  }
  else if(form.dataset.option === 'set'){
    const result = await fjs.fetchSetStock(id,quantity);
    console.log(result.newStock);
    resElement.textContent = `Update Succesful, new quantity: ${result.newStock}`
  }
  else{
    throw new Error('Stock Update Failed')
  }
  form.classList.add('hide')
}






function onlynum() {
  var fm = document.getElementById("form2");
  var ip = document.getElementById("num");
  var tag = document.getElementById("value");
  var res = ip.value;

  if (res != '') {
      if (isNaN(res)) {
            
          // Set input value empty
          ip.value = "";
            
          // Reset the form
          fm.reset();
          return false;
      } else {
          return true
      }
  }
}

function setupListeners() {
  document.querySelector('.stock-product-container');
  document.querySelector('#quantity-input-submit').onclick= async () => {await updateStock()}
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
