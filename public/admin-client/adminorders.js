import * as admin from './admin.js'


function setupListeners() {

}

async function init() {
  await admin.listOrders()
  setupListeners();
}

window.addEventListener('load', init);