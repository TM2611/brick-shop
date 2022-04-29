import * as admin from './admin.js'


function setupListeners() {

}

async function init() {
  await admin.adminListOpenOrders()
  setupListeners();
}

window.addEventListener('load', init);