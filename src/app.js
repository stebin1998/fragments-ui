import { signIn, getUser } from './auth.js';

async function init() {
  const loginButton = document.getElementById('login');
  const userInfo = document.getElementById('user-info');
  const username = document.getElementById('username');

  // Handle login click
  loginButton.onclick = () => {
    signIn();
  };

  // Check if the user is logged in
  const user = await getUser();
  if (user) {
    loginButton.hidden = true;
    userInfo.hidden = false;
    username.textContent = user.username;
  }
}

document.addEventListener('DOMContentLoaded', init);

