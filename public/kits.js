import * as _ from './nav.js';
import * as fjs from './fetch.js';
import * as ba from './basket.js';

//TODO: refactor for promo
const PROMO_KIT_ID = 'B0NS41'
const PROMO_KIT_NAME = 'Bonsai Tree'
const PROMO_KIT_IMG_SRC = './images/kits/bonsai/bonsai.png'

async function renderKits(){
  const promoKitName = document.querySelector('.promo-kit-img-caption');
  const atbPromoBtn = document.querySelector('.atb-promo-btn');
  const promoKitImg = document.querySelector('.promo-kit-img'); 
  atbPromoBtn.dataset.id = PROMO_KIT_ID
  promoKitName.textContent = PROMO_KIT_NAME;
  promoKitImg.src = PROMO_KIT_IMG_SRC;
  promoKitImg.alt = `${PROMO_KIT_NAME} image`
  await displayBonsaiParts()
  // const kitATBs = document.querySelectorAll('.kit-buy')
  // for(const atb of kitATBs){

  //   }
  if (ba.basket.has(PROMO_KIT_ID)) {
    atbPromoBtn.innerText = 'In Basket';
    atbPromoBtn.disabled = true;
  }
}

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


async function bonsaiAddToBasket(e){
  const kit = await fjs.fetchKit(PROMO_KIT_ID) //use fetch for future kits
  const addToBasket = document.querySelector('.atb-promo-btn');
  addToBasket.dataset.id = kit.KitID;
  ba.addToBasket(e,kit)
}


function setupListeners() {
  document.querySelector('.atb-promo-btn').addEventListener('click', bonsaiAddToBasket)
}

async function init(){
  await ba.initBasket()
  await renderKits()
  setupListeners()
}



window.addEventListener('load', init);
