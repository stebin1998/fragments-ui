import { UserManager } from 'oidc-client-ts';

const config = {
  authority: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.AWS_COGNITO_POOL_ID}`,
  client_id: process.env.AWS_COGNITO_CLIENT_ID,
  redirect_uri: process.env.OAUTH_SIGN_IN_REDIRECT_URL,
  response_type: 'code',
  scope: 'openid email',
};

const userManager = new UserManager(config);

// Redirect the user to Cognito for login
export async function signIn() {
  try {
    await userManager.signinRedirect();
  } catch (err) {
    console.error('Login failed:', err);
  }
}

// Handle the redirect from Cognito after login
export async function handleRedirectCallback() {
  try {
    const user = await userManager.signinRedirectCallback();
    console.log('Logged in user:', user);
    sessionStorage.setItem('accessToken', user.access_token); // Save token
  } catch (err) {
    console.error('Error handling redirect callback:', err);
  }
}

// Retrieve the access token
export async function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}
