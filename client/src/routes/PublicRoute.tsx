import { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountContext';


type PublicRouteProps = {
  children: ReactElement
}

const PublicRoute: React.FunctionComponent<PublicRouteProps> = ({ children }) => {
  const { getSession } = useContext(AccountContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getSession, navigate]);

  if (isLoading) {
    return <></>;
  }

  return children;
};


export default PublicRoute;