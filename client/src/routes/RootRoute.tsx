import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import Navigation from "../layouts/Navigation";

export default function Root() {
  const { getSession } = useContext(AccountContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then(() => {})
      .catch(err => {
        console.log('Session error, navigating to login. ', err);
        navigate("/login", { replace: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getSession, navigate]);

  if (isLoading) {
    return <><Navigation /></>;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
