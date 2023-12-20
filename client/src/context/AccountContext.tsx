import { AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Pool from "../utils/user-pool";
import { authenticatedUser } from "./signals";

type User = {
  username: string,
  email: string,
  sub: string
}

type authenticatedUser = User | null;

type AccountContextProps = {
  getAuthenticatedUser: () => Promise<User | null>,
  authenticate: (Username: string, Password: string) => Promise<unknown>;
  getSession: () => Promise<unknown>;
  getToken: () => Promise<unknown>;
  logout: () => void;
}

const AccountContext = createContext<AccountContextProps>({
  getAuthenticatedUser: () => new Promise<User | null>(() => {}),
  authenticate: async () => {},
  getSession: async () => {},
  getToken: async () =>  {},
  logout: () => {},
});

const Account = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const getAuthenticatedUser: () => Promise<User | null> = () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = Pool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
            return;
          }
          if (session) {
            const idToken = session.getIdToken().getJwtToken();
            const payload = idToken.split('.')[1];
            const userInfo = JSON.parse(window.atob(payload));

            const authedUser: authenticatedUser = {
              username: userInfo['custom:username'],
              email: userInfo.email,
              sub: userInfo.sub
            };
            authenticatedUser.value = authedUser;
            resolve(authedUser);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
  };


  const getSession = async () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          }
          if (session) {
            resolve(session);
          }
        });
      } else {
        reject(new Error("No current user."));
      }
    });
  };

  const getToken = async () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err) {
            reject(err);
          } else if (session) {
            const token: string = session.getIdToken().getJwtToken();
            resolve(token);
          } else {
            reject(new Error("Session not found"));
          }
        });
      } else {
        reject(new Error("No current user."));
      }
    });
  };

  const authenticate = async (Username: string, Password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess ", data);
          resolve(data);
        },
        onFailure: (error) => {
          console.error("onFailure ", error);
          reject(error);
          navigate("/login", { replace: true });
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired ", data);
          resolve(data);
        }
      });
    })
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    navigate("/login", { replace: true });
  };

  return (
    <AccountContext.Provider value={{ getAuthenticatedUser, authenticate, getSession, logout, getToken }}>
      {props.children}
    </AccountContext.Provider>
  )
};

export { Account, AccountContext };
