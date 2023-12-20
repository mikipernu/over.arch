import { ChangeEvent, FormEvent } from 'react';

type AddLocationForm = {
  newLocation: { name: string; zipcode: string; address: string };
  isLoading: boolean;
  error: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const AddLocationForm: React.FC<AddLocationForm> = ({
  newLocation,
  isLoading,
  error,
  onInputChange,
  onSubmit
}) => {
  return (
    <div className="w-full py-4 mt-2 mb-0">
      <h2 className="text-lg font-bold mb-4">Add new location</h2>
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row justify-between md:items-end items-start">
        <div className="mb-2 md:mb-0 md:w-1/4 md:pr-2">
          <label htmlFor="name" className="block text-xs font-medium text-gray-900 mb-1.5">Location name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={newLocation.name}
            onChange={onInputChange}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-42md:mb-0 md:w-1/4 md:px-2">
          <label htmlFor="zipcode" className="block text-xs font-medium text-gray-900 mb-1.5">Zip code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zip code"
            value={newLocation.zipcode}
            onChange={onInputChange}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-2 md:mb-0 md:w-1/4 md:pl-2">
          <label htmlFor="address" className="block text-xs font-medium text-gray-900 mb-1.5">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={newLocation.address}
            onChange={onInputChange}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 text-sm text-white bg-indigo-700 rounded-lg hover:bg-indigo-600 font-medium mt-2 md:mt-0"
        >
          Add location
        </button>
      </form>
      {error && <p className="mt-3 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default AddLocationForm;
