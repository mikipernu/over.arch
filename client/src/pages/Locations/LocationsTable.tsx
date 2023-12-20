import { useEffect, useRef } from 'react';
import { Location } from '../../services/locationService';

type LocationsTableProps = {
  locations: Location[];
  isLoading: boolean;
  onEditLocation: (location: Location) => void;
};

const LocationsTable: React.FC<LocationsTableProps> = ({ locations, isLoading, onEditLocation }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      const savedScrollPosition = sessionStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
        tableContainerRef.current.scrollTop = Number(savedScrollPosition);
      }
    }
  }, [locations]);

  const handleScroll = () => {
    if (tableContainerRef.current) {
      sessionStorage.setItem('scrollPosition', String(tableContainerRef.current.scrollTop));
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Browse locations</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full min-h-[470px] max-h-[470px] overflow-y-auto" ref={tableContainerRef} onScroll={handleScroll}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-50 uppercase bg-gray-50 sticky top-0">
            <tr className="bg-indigo-600 border-b">
              <th scope="col" className="px-6 py-3 w-1/4">Place</th>
              <th scope="col" className="px-6 py-3 w-1/6">Zip code</th>
              <th scope="col" className="px-6 py-3 w-2/5">Address</th>
              <th scope="col" className="px-6 py-3 w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="h-6 bg-gray-100 rounded"> </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="h-6 bg-gray-100 rounded"> </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="h-6 bg-gray-100 rounded"> </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="h-6 bg-gray-100 rounded"> </div>
                </td>
              </tr>
            ))
            ) : (
              locations.map((location) => (
                <tr key={location.location_id} className="bg-white border-b hover:bg-indigo-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {location.name}
                  </td>
                  <td className="px-6 py-4">
                    {location.zipcode}
                  </td>
                  <td className="px-6 py-4">
                    {location.address}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onEditLocation(location)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LocationsTable;