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

//TODO: remove? (already have getprofile)
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
    // TODO: handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }
  // handle the response
  console.log(await response.text());
}

export async function getProfile() {
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
    // TODO: handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }
  return await response.text();
}

//TODO: remove (can get userid from getprofile())
export async function getUserID() {
  // Get the access token from the Auth0 client
  const token = await auth.auth0.getTokenSilently();
  const fetchOptions = {
    credentials: 'same-origin',
    method: 'GET',
    // Give access to the bearer of the token.
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await fetch('/userID', fetchOptions);
  if (!response.ok) {
    // TODO: handle the error
    el.textContent = 'Server error:\n' + response.status;
    return;
  }
  // handle the response
  console.log(await response.text());
  return response
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


