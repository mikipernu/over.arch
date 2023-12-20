type Pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  totalLocations: number;
}

const Pagination: React.FC<Pagination> = ({currentPage, totalPages, onPageChange, limit, totalLocations}) => {
  return (
    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 mb-4 block w-full md:inline">Showing <span className="font-semibold text-gray-900">{((currentPage - 1) * limit) + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * limit, totalLocations)}</span> of <span className="font-semibold text-gray-900">{totalLocations}</span></span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button onClick={() => onPageChange(i + 1)} className={`flex items-center justify-center px-3 h-8 ${currentPage === i + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{i + 1}</button>
            </li>
          ))}
          <li>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
          </li>
        </ul>
      </nav>
  );
};

export default Pagination;