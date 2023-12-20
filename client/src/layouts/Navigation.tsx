import { useNavigate } from 'react-router-dom';
import logo from '../assets/overarch-logo-white.svg';
import AuthStatus from "../context/AuthStatus";

const Navigation = () => {
  const nav = useNavigate();
  const navigate = () => {
    nav('/');
  };

  return (
  <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50">
    <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-3 ml-2">
      <button onClick={() => navigate()} className="flex items-center">
          <img src={logo} className="h-8 mr-4 select-none" alt="Overarch logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white select-none">over·arch</span>
      </button>
      <div className="md:block md:w-auto" id="navbar">
        <ul className="font-medium flex flex-col p-3">
          <li><AuthStatus /></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navigation;