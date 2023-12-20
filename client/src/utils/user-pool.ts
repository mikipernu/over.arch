import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
  UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID as string,
  ClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID as string,
} as const;

export default new CognitoUserPool(userPoolData);