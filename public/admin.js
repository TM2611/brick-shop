import * as auth from './auth.js';

async function checkAdmin() {
  debugger
  const token = await auth.auth0.getTokenSilently();

  const fetchOptions = {
    credentials: 'same-origin',
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await fetch('/admin/check', fetchOptions);
  if (!response.ok) {
    // handle the error
    console.log(response.status);;
    return;
  }
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await checkAdmin();
  //setupListeners();
}






// window.addEventListener('load', init);