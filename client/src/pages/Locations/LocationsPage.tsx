import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import Pagination from '../../components/table/Pagination';
import Breadcrumb from '../../layouts/Breadcrumb';
import Modal from '../../layouts/Modal';
import Toast from '../../layouts/Toast';
import { Location, LocationCreate, locationService } from '../../services/locationService';
import userPool from '../../utils/user-pool';
import AddLocationForm from './AddLocationForm';
import LocationsTable from './LocationsTable';
import LocationForm from './UpdateLocationForm';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState({ name: '', zipcode: '', address: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLocations, setTotalLocations] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const limit = 20;

  useEffect(() => {
    const fetchToken = () => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession((err: Error | null, session: null | CognitoUserSession) => {
          if (err) {
            setError('Error getting Cognito session');
          } else if (session && session.isValid()) {
            setToken(session.getIdToken().getJwtToken());
          }
        });
      } else {
        setError('No current user');
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchLocations();
    }
  }, [token, currentPage]);

  const fetchLocations = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit;
      const response = await locationService.getLocations(token, offset, limit);
      setTotalLocations(response.total);

      const formattedLocations = response.items.map(location => ({
        ...location,
        created_at: format(parseISO(location.created_at), 'PPP'),
        modified_at: location.modified_at ? format(parseISO(location.modified_at), 'PPP') : '',
      }));
      setLocations(formattedLocations);
    } catch (err) {
      setError("Couldn't get locations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    try {
      await locationService.createLocation(token, newLocation);
      await fetchLocations();
      setMessage({ type: 'success', text: "Added new location." });
      setNewLocation({ name: '', zipcode: '', address: '' });
    } catch (err) {
      setError("Couldn't create a new location");
    }
  };

  const handleUpdateLocation = async (locationData: LocationCreate) => {
    try {
      if (!selectedLocation || !selectedLocation.location_id) {
        throw new Error("No location selected for update.");
      }

      const updatedLocation = await locationService.updateLocation(token, selectedLocation.location_id, locationData);

      if (!updatedLocation) {
        throw new Error("Failed to update location.");
      }

      await fetchLocations();
      setIsModalOpen(false);
      setMessage({ type: 'success', text: "Location updated successfully." });
    } catch (err) {
      console.error("Error updating location:", err);
      setMessage({ type: 'error', text: "Couldn't update location." });
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    try {
      await locationService.deleteLocation(token, locationId);
      await fetchLocations();
      setIsModalOpen(false);
      setMessage({ type: 'success', text: "Location deleted successfully." });
    } catch (err) {
      console.error("Error deleting location:", err);
      setMessage({ type: 'error', text: "Couldn't delete location." });
    }
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col justify-center h-[calc(100%-72px)] overflow-hidden px-8 py-5">
      {message && (
        <div className="fixed right-8 top-[100px]">
          <Toast type={message.type} message={message.text} onClose={() => setMessage(null)} />
        </div>
      )}
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Locations', path: null }]} />
      <AddLocationForm
        newLocation={newLocation}
        isLoading={isLoading}
        error={error}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <LocationsTable locations={locations} isLoading={isLoading} onEditLocation={handleEditLocation} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalLocations / 20)}
        onPageChange={setCurrentPage}
        limit={20}
        totalLocations={totalLocations}
      />
      <Modal title="Edit location" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <LocationForm
          location={selectedLocation}
          onFormSubmit={handleUpdateLocation}
          onDelete={handleDeleteLocation}
          isLoading={isLoading}
          onCloseModal={toggleModal}
          message={message}
          setMessage={setMessage}
        />
      </Modal>
    </div>
  );
};

export default LocationsPage;
