import * as main from './main.js';
import * as auth from './auth.js';
import * as ba from './basket.js';



function setupListeners() {
  document.querySelector('#login-icon').addEventListener('click', main.showDropdown);
  document.querySelector('#btn-login').addEventListener('click', auth.login);
  document.querySelector('#btn-logout').addEventListener('click', auth.logout);
  document.querySelector('.profile').addEventListener('click', ba.viewProfile);
  document.querySelector('.btn-checkout').addEventListener('click', ba.checkoutPage);
  document.querySelector('.basket-btn').addEventListener('click', ba.viewBasket);
  document.querySelector('.close-basket').addEventListener('click', ba.closeBasket);
  document.querySelector('.clear-basket').addEventListener('click', ba.clearBasket);
  window.addEventListener('scroll', main.navbarDisplay);
  window.addEventListener('click', main.closeDropdown);
}


async function init() {
  await auth.initializeAuth0Client();
  await auth.updateAuthUI();
  await auth.handleAuth0Redirect();
  await ba.initBasket();
  setupListeners();
}

window.addEventListener('load', init);