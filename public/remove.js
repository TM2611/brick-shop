import * as admin from './admin.js'


function setupListeners() {
  // Setup future listeners;
  // formFetchListener()
  // document.querySelector('#removeProduct').addEventListener('click', callServer)

}

async function init() {
  // await auth.initializeAuth0Client();
  // await auth.updateAuthUI();
  // await auth.handleAuth0Redirect();
  await admin.listProducts()
  setupListeners();
}

window.addEventListener('load', init);