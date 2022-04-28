import * as auth from './auth.js';
import * as fjs from './fetch.js';

//TODO: move fetch functions to fjs

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
  return await response.json();
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
  console.log(await response.json());
  return response
}




//Needed in basket and potentially kit page in the future
export async function getAllKits(){
  const kitIDs = await fjs.fetchAllKitIDs()
  return kitIDs
}

export async function checkBasketKit(itemID){
  const kitIDs = await getAllKits()
  for (const kit of kitIDs){
    if(kit.KitID === itemID){
      return true
    }
  }
  return false
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

export function ordersPage() {
  window.location.pathname = 'orders.html';
}

