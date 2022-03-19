/* eslint-disable no-undef */ // not recgonising fetch?
export async function fetchAuthConfig() {
  // eslint-disable-next-line no-undef
  const response = await fetch('./auth_config');
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

// global auth libray entry point variable
export let auth0 = null;

// Uses fetchAuthConfig to obtain the configuration file and initialize the auth0 variable
export async function initializeAuth0Client() {
  const config = await fetchAuthConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
}

// update the state of all authentication-related elements
export async function updateAuthUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  document.getElementById('btn-login').disabled = isAuthenticated;
  document.getElementById('btn-logout').disabled = !isAuthenticated;
  document.querySelector('.btn-checkout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    // Content no longer gated
    const user = await auth0.getUser();
    const loginBtn = document.querySelector('#btn-login');
    const loginIcon = document.querySelector('#login-icon');
    const initialDOM = document.querySelector('#initial');
    const initial = (user.name.charAt(0)).toUpperCase();
    initialDOM.textContent = initial;
    loginIcon.classList.toggle('display');
    loginBtn.classList.toggle('display');
  }
}

export async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin, // redirect user back to the same page they are on currently.
  });
}

export function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// Remove the query from the URL
export async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      // process the login state
      await auth0.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }

    // remove the query parameters
    window.history.replaceState({}, document.title, '/');

    await updateAuthUI();
  }
}
