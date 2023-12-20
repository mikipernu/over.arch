import { useNavigate } from "react-router-dom";

type CardProps = {
  path: string,
  content: string
}

const HomeCard: React.FC<CardProps> = ({ path, content }) => {
  const nav = useNavigate();
  const navigate = () => {
    nav(path);
  };

  return (
  <div onClick={() => navigate()} className="m-1 card w-96 bg-base-100 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{content}</h6>
    <p className="font-normal text-gray-700 dark:text-gray-400">Example</p>
  </div>
  )
}

export default HomeCard;
