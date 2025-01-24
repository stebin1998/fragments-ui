import { signIn, getUser } from './auth.js';

async function init() {
  const loginButton = document.getElementById('login');

  loginButton.onclick = async () => {
    await signIn();
  };

  const user = await getUser();
  if (user) {
    console.log('User logged in:', user);
  }
}

document.addEventListener('DOMContentLoaded', init);
