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
    name.textContent = `${product.Colour} ${product.ProductName}`;
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

//dynamically create order list table
export async function adminListOpenOrders(){
  const t1 = document.querySelector('.admin-order-row-template');
  const tableBody = document.querySelector('.admin-order-table-body');
  const orders = await fjs.fetchAdminOpenOrders();
  for (const order of orders){
    const orderRowTemplate = t1.content.cloneNode(true);
    const orderIDCell = orderRowTemplate.querySelector('.admin-order-id-cell');
    const custIDCell = orderRowTemplate.querySelector('.customer-id-cell');
    const dateCell = orderRowTemplate.querySelector('.admin-order-date-cell');
    // const dispatchCell = orderRowTemplate.querySelector('.admin-order-table-dispatch');
    orderIDCell.textContent = order.OrderID;
    orderIDCell.dataset.id = order.OrderID;
    custIDCell.textContent = order.CustomerID;
    dateCell.textContent = order.OrderDate;
    // dispatchCell.textContent = order.Dispatched;
    tableBody.append(orderRowTemplate)
  }
  const orderRows = document.querySelectorAll('.admin-order-table-row');
  for (const row of orderRows){
    row.addEventListener('click', orderDispatched)
  }
}


async function orderDispatched(e){
  const orderID = e.target.parentElement.querySelector('.admin-order-id-cell').dataset.id;
  const prompt = `You are about to mark the following order as dispatched:\n${orderID}\nThis action cannot be undone.`
  if (confirm(prompt) == true) {
    const result = await fjs.fetchOrderDispatched(orderID)
    const el = document.querySelector('.server-update-response')
    el.textContent = `Marked Order:\n${orderID}\n as dispatched`
    debugger
    await clearOrderRow(e)
    //e.target.remove()
  }

}

async function clearOrderRow(e){
  const orderRow = e.target.parentElement
  orderRow.removeEventListener('click', orderDispatched)
  for(const cell of orderRow.children){
    cell.textContent = ""
  }
}

//Remove product functions
async function removeProduct(e){
  const removeID = e.target.querySelector('.stock-product-id').dataset.id
  const prompt = `You are about to delete product:\n${removeID}\nThis action cannot be undone.`
  if (confirm(prompt) == true) {
    const result = await fjs.fetchRemoveProduct(removeID)
    const el = document.querySelector('.server-update-response')
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

