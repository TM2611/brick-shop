import * as auth from './auth.js';



function setupListeners() {
  // Setup future listeners;
  // formFetchListener()
  // document.querySelector('#removeProduct').addEventListener('click', callServer)

}



// async function formFetchListener(){
//   document.forms['removeProduct'].addEventListener('submit', (event) => {
//     event.preventDefault();
//     // Show user that form is being submitted
//     const el = document.getElementById('server-response');
//     el.textContent = 'Checking Product…';
//     fetch(event.target.action, {
//         method: 'POST',
//         body: new URLSearchParams(new FormData(event.target)) // event.target is the form
//     }).then((response) => {
//       el.textContent = await response.text();
//     }).then((body) => {
//         // TODO handle body
//         console.log("body:",body);
//     }).catch((error) => {
//       el.textContent = 'Product does not exist';
//       console.log(error);
//     });
// });
// }

async function callServer() {
  debugger
  const el = document.getElementById('server-response');
  el.textContent = 'Checking Product…';
  const response = await fetch('/test/product/id', fetchOptions);
  if (!response.ok) {
    // handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }

  // handle the response
  const data = await response.text();
  el.textContent = data;
}

async function init() {
  // await auth.initializeAuth0Client();
  // await auth.updateAuthUI();
  // await auth.handleAuth0Redirect();
  setupListeners();
}

window.addEventListener('load', init);