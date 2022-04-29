import * as admin from './admin.js'


function setupListeners() {

}

async function init() {
  await admin.adminOpenListOrders()
  setupListeners();
}

window.addEventListener('load', init);