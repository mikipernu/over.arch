import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "./AccountContext";

const AuthStatus = () => {
  const navigate = useNavigate();
  const { getSession, logout } = useContext(AccountContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const checkSession = async () => {
      try {
        const session = await getSession();
        if (!signal.aborted) {
          setIsAuthenticated(!!session);
        }
      } catch (error) {
        if (!signal.aborted) {
          setIsAuthenticated(false);
        }
      }
    };

    checkSession();

    return () => {
      abortController.abort();
    };
  }, [getSession]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="block py-0 pl-3 pr-2 text-white">Logout</button>
      ) : <div className="block py-0 pl-3 pr-4 text-gray-900white">_</div>}
    </div>
  );
};

export default AuthStatus;
