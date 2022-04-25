import * as auth from './auth.js';

export async function checkoutPage() {
  const isAuthenticated = await auth.auth0.isAuthenticated();
  if (isAuthenticated){
    window.location.pathname = 'checkout.html';
    return
  }
  await auth.login()
  debugger
  window.location.pathname = 'checkout.html';
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


