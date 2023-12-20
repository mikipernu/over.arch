import { Link, useNavigate } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  path: string | null;
};

type Breadcrumb = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<Breadcrumb> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index === 0 ? (
              <button onClick={() => item.path && navigate(item.path)} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 me-2">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                {item.label}
              </button>
            ) : item.path ? (
              <Link to={item.path} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className="ms-0 text-sm font-medium text-gray-500">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <svg className="rtl:rotate-180 w-2 h-2.5 text-gray-400 mx-1" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
