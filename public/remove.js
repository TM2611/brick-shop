import * as admin from './admin.js'





// async function callServer() {
  //   const el = document.getElementById('server-response');
//   el.textContent = 'Checking Product…';
//   const response = await fetch('/test/product/id', fetchOptions);
//   if (!response.ok) {
//     // handle the error
//     el.textContent = 'Server error:\n' + response.status;
//     return;
//   }

//   // handle the response
//   const data = await response.text();
//   el.textContent = data;
// }

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