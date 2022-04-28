import * as admin from './admin.js'


function setupListeners() {

}

async function init() {
  await admin.adminListOrders()
  setupListeners();
}

window.addEventListener('load', init);