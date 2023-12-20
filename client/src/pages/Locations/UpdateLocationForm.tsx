import { useEffect, useState } from 'react';
import { Location, LocationCreate } from '../../services/locationService';

type LocationFormProps = {
  location: Location | null;
  onFormSubmit: (locationData: LocationCreate) => Promise<void>;
  onDelete: (locationId: number) => Promise<void>;
  isLoading: boolean;
  onCloseModal: () => void;
  message: { type: 'success' | 'error', text: string } | null;
  setMessage: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error', text: string } | null>>;
};

const LocationForm: React.FC<LocationFormProps> = ({ location, onFormSubmit, onDelete, isLoading, onCloseModal }) => {
  const [formState, setFormState] = useState<LocationCreate>({ name: '', zipcode: '', address: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (location) {
      setFormState({
        name: location.name,
        zipcode: location.zipcode || '',
        address: location.address || '',
      });
    }
  }, [location]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onFormSubmit(formState);
      setMessage({ type: 'success', text: "Updated location." });
    } catch (error) {
      setMessage({ type: 'error', text: "Couldn't update location." });
    }
  };

  const handleDelete = async () => {
    if (location && location.location_id) {
      try {
        await onDelete(location.location_id);
        onCloseModal();
      } catch (error) {
        setMessage({ type: 'error', text: "Couldn't delete location." });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 md:mb-0">
        <label htmlFor="name" className="block text-xs font-medium text-gray-900 mb-1.5">Location name</label>
        <input
          type="text"
          name="name"
          placeholder="Location name"
          value={formState.name}
          onChange={handleChange}
          disabled={isLoading}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />
      </div>
      <div className="mb-2 md:mb-0">
        <label htmlFor="zipcode" className="block text-xs font-medium text-gray-900 mb-1.5">Zip code</label>
        <input
          type="text"
          name="zipcode"
          placeholder="Zip code"
          value={formState.zipcode}
          onChange={handleChange}
          disabled={isLoading}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />
      </div>
      <div className="mb-2 md:mb-0">
        <label htmlFor="address" className="block text-xs font-medium text-gray-900 mb-1.5">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formState.address}
          onChange={handleChange}
          disabled={isLoading}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-5"
        />
      </div>
      <button type="submit" disabled={isLoading} className="px-5 py-2.5 text-sm text-white bg-indigo-700 rounded-lg hover:bg-indigo-600 font-medium mt-2 md:mt-0 w-full mb-3">
        Update location
      </button>

      <button type="button" onClick={handleDelete} disabled={isLoading} className="px-5 py-2.5 text-sm text-white bg-red-700 rounded-lg hover:bg-red-600 font-medium mt-2 md:mt-0 w-full">
        Delete location
      </button>

      {message && (
        <div className={`mt-3 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </div>
      )}
    </form>
  );
};

export default LocationForm;