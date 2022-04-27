import * as _ from './nav.js';
import * as fjs from './fetch.js';
import * as ba from './basket.js';

async function displayBonsaiParts(){
  const kitParts = await fjs.fetchBonzaiProducts()
  const t1 = document.querySelector('.kit-part-template')
  const container = document.querySelector('.part-list-container')
  for (const part of kitParts) {
    const partTemplate = t1.content.cloneNode(true);
    const img = partTemplate.querySelector('.part-img');
    const quantity = partTemplate.querySelector('.part-quantity');
    img.src = part.ProductImageSrc;
    img.alt = `${part.ProductName} Image`;
    quantity.textContent = part.ProductQuantity;
    container.append(partTemplate);}
}

function bonsaiAddToBasket(e){
  ba.addToBasket(e,'B0NS41')
}


function setupListeners() {
  document.querySelector('.atb-bonsai-btn').addEventListener('click', bonsaiAddToBasket)
}

async function init(){
  await ba.initBasket()
  await displayBonsaiParts()
  setupListeners()
}



window.addEventListener('load', init);
