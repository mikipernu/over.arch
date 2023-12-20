import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/AccountContext";

export type User = {
  username: string,
  email: string,
  sub: string
}

export type AuthenticatedUser = User | null;

const UserSettings = () => {
  const { getAuthenticatedUser, getSession } = useContext(AccountContext);
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSession()
      .then(() => {
        getAuthenticatedUser().then((user: User | null) => {
          if (user) {
            setAuthStatus(true);
            setUser(user);
          }
        });
      })
      .catch(err => {
        console.log("Error: ", err);
        setAuthStatus(false);
      });
  }, [getSession, getAuthenticatedUser]);

  return (
    <div>
      {authStatus && user &&(
      <>
        <h2>Settings {user.username}</h2>
      </>
      )}
    </div>
  )
};

export default UserSettings;