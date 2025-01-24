import { signIn, handleRedirectCallback, getAccessToken } from './auth.js';

/**
 * Fetch fragments using the access token.
 */
async function fetchFragments() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    console.error('User is not authenticated.');
    alert('Please log in first.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/v1/fragments', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fragments:', data);
    } else {
      console.error('Failed to fetch fragments:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching fragments:', error);
  }
}

// Add event listeners to buttons
document.getElementById('loginButton').addEventListener('click', () => {
  signIn();
});

document
  .getElementById('fetchFragmentsButton')
  .addEventListener('click', fetchFragments);

// Handle OAuth redirect callback
handleRedirectCallback();
