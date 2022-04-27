import * as fjs from '../fetch.js';
import * as admin from './admin.js'


async function updateStock(){
  const form = document.querySelector('.quantity-input-form');
  const input = document.querySelector('#quantity-input');
  const id = form.dataset.id
  const quantity = input.value;
  const resElement = document.querySelector('.stock-update-response');
  if(form.dataset.option === 'add'){
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

// function onlynum() {
//   var fm = document.getElementById("form2");
//   var ip = document.getElementById("num");
//   var tag = document.getElementById("value");
//   var res = ip.value;

//   if (res != '') {
//       if (isNaN(res)) {
            
//           // Set input value empty
//           ip.value = "";
            
//           // Reset the form
//           fm.reset();
//           return false;
//       } else {
//           return true
//       }
//   }
// }

function addSelection(e){
  const selectedOption = admin.selectedOption()
  if(selectedOption){
    selectedOption.classList.remove('stock-option-selected')
  }
  e.target.classList.add('stock-option-selected')
}

function setupListeners() {
  document.querySelector('.stock-product-container');
  document.querySelector('#quantity-input-submit').onclick= async () => {await updateStock()}
  const stockOptions = document.querySelectorAll('.stock-options');
  for (const option of stockOptions) {
    option.addEventListener('click', addSelection)
  }
}


async function init() {
  await admin.listProducts()
  setupListeners();
}

window.addEventListener('load', init);
