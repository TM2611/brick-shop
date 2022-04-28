export async function fetchSortSingles() {
  const filter = document.querySelector('#colour-filter');
  const colour = filter.options[filter.selectedIndex].text.toLowerCase();
  const sort = document.querySelector('#sort');
  const regex = /[)( ]/g ; //Remove any brackets or spaces
  const sortType = sort.options[sort.selectedIndex].text.replace(regex, '');
  if (colour === 'any' && sortType === 'MostPopular') {
    return await fetchAllSingles();
  }
  else if (colour === 'any' && sortType !== 'MostPopular'){
    return await fetchSingleSorted(sortType);
  }
  else if (colour !== 'any' && sortType !== 'MostPopular'){ 
    return await fetchSingleColourSorted(colour, sortType);
  }
  //Most popular is default, no sorting needed
  return await fetchSingleColour(colour)
}

export async function fetchAllSingles() {
  const response = await fetch('/single'); // By Most Popular
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchSingleColour(colour){
  const response = await fetch('/single/colour/' + colour);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchSingleColourSorted(colour, sortType){
  const response = await fetch(`/single/colour/${colour}/${sortType}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

async function fetchSingleSorted(sortType){
  const response = await fetch(`/single/sort/${sortType}`);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchAdminOrders(){
  const response = await fetch('/test/orders')
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchCustomerOrders(userID){
  const response = await fetch(`/orders/${userID}`)
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchAllProducts(){
  const response = await fetch('/test/product/stock/list');
  if (!response.ok) {
    throw response;
  }
  return response.json();
}


//-------------KITS----------------//

export async function fetchAllKitIDs() {
  const response = await fetch(`/kit/all/id`)
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchKit(kitID) {
  const response = await fetch(`/kit/${kitID}`)
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchKitPrice(kitID) {
  const response = await fetch(`/kit/${kitID}/price`)
  if (!response.ok) {
    throw response;
  }
  return response.json();
}


export async function fetchBonzaiProducts(){
  const response = await fetch('/kit/bonsai/parts');
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

//-------------Stock----------------//
export async function fetchRemoveProduct (removeID){
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(`/test/product/${removeID}`, fetchOptions)
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchStockIncrease(id,quantity){
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(`/test/product/increase/${id}/${quantity}`, fetchOptions);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchStockDecrease(id,quantity){
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(`/test/product/decrease/${id}/${quantity}`, fetchOptions);
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

export async function fetchSetStock(id,quantity){
  const fetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }
  console.log("pre-response")
  const response = await fetch(`/test/product/set/${id}/${quantity}`, fetchOptions);
  // TODO: not logging
  console.log("post-response")
  if (!response.ok) {
    throw response;
  }
  return response.json();
}

