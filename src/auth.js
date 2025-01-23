import { UserManager } from 'oidc-client-ts';

const config = {
  authority: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.AWS_COGNITO_POOL_ID}`,
  client_id: process.env.AWS_COGNITO_CLIENT_ID,
  redirect_uri: process.env.OAUTH_SIGN_IN_REDIRECT_URL,
  response_type: 'code',
  scope: 'openid email',
};

const userManager = new UserManager(config);

export async function signIn() {
  await userManager.signinRedirect();
}

export async function getUser() {
  const user = await userManager.getUser();
  return user ? { username: user.profile.email } : null;
}

