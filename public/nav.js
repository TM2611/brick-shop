/* 
All pages with the home screen navbar import this module, on load will setup
all event listeners required for the navbar.
As more functionality is added to the navbar, this module becomes 
increasingly more useful as changes are easier to make. Also results in less code
as there does not need to be event listeners writtern in each module.
*/ 

import * as ba from './basket.js';
import * as auth from './auth.js';

let prevScrollpos;

export function showDropdown(e) {
  if (e.target.closest('.icon-options')) {
    // we are inside the menu, ignore the click
    return;
  }
  document.querySelector('.icon-options').classList.add('display');
}

export function closeDropdown(e) {
  // Hide dropdown if user clicks outside of dropdown or login icon
  const initial = document.querySelector('#initial');
  const icon = document.querySelector('#login-icon');
  if (!(e.target.closest('.icon-options')) && ((e.target !== icon) && (e.target !== initial))) {
    document.querySelector('.icon-options').classList.remove('display');
  }
}

//TODO: hide/show nav functionality not working
export function navbarDisplay() {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');
  if (prevScrollpos > currentScrollPos) {
    navbar.classList.remove('hide-nav');
  } else {
    navbar.classList.add('hide-nav');
  }
  prevScrollpos = currentScrollPos;
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

export function checkoutPage() {
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

function setupListeners() {
  document.querySelector('.home-nav').addEventListener('click', homePage);
  document.querySelector('.singles-nav').addEventListener('click', singlesPage);
  document.querySelector('.kits-nav').addEventListener('click', kitsPage);
  document.querySelector('#login-icon').addEventListener('click', showDropdown);
  document.querySelector('.profile').addEventListener('click', viewProfile);
  document.querySelector('.btn-checkout').addEventListener('click', checkoutPage);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  window.addEventListener('scroll', navbarDisplay);
  window.addEventListener('click', closeDropdown);
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  setupListeners();
}

window.addEventListener('load', init);