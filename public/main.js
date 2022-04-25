import * as auth from './auth.js';

export async function checkoutPage() {
  const isAuthenticated = await auth.auth0.isAuthenticated();
  if (isAuthenticated){
    window.location.pathname = 'checkout.html';
    return
  }
  await auth.login()
  //TODO: Go to checkout page after log in
}

export async function viewProfile() {
  // Get the access token from the Auth0 client
  const token = await auth.auth0.getTokenSilently();
  const fetchOptions = {
    credentials: 'same-origin',
    method: 'GET',
    // Give access to the bearer of the token.
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await fetch('/profile', fetchOptions);
  if (!response.ok) {
    // handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }
  // handle the response
  console.log(await response.text());
}

export function homePage() {
  window.location.pathname = 'index.html';
}

export function kitsPage() {
  window.location.pathname = 'kits.html';
}

export function singlesPage() {
  window.location.pathname = 'singles.html';
}

export function confirmPage() {
  window.location.pathname = 'confirmation.html';
}


