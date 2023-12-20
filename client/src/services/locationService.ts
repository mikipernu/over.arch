import { z } from "zod";

const locationSchema = z.object({
  location_id: z.number(),
  name: z.string(),
  zipcode: z.string().optional(),
  address: z.string().optional(),
  created_at: z.string(),
  modified_at: z.string(),
});

const locationCreateSchema = locationSchema.omit({
  location_id: true,
  created_at: true,
  modified_at: true,
});

function paginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    items: z.array(itemSchema),
  });
}

const locationPaginatedResponseSchema = paginatedResponseSchema(locationSchema);

export type Location = z.infer<typeof locationSchema>;
export type LocationCreate = z.infer<typeof locationCreateSchema>;
export type LocationPaginatedResponse = z.infer<typeof locationPaginatedResponseSchema>;

const base_url = import.meta.env.VITE_API_BASE_URL;

const makeFetchRequest = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data: unknown | null,
  token: string,
  schema: z.ZodTypeAny
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const options = {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return schema.parse(result);
};

export const locationService = {
  createLocation: async (token: string, locationData: LocationCreate): Promise<Location> => {
    return makeFetchRequest(`${base_url}/locations/`, 'POST', locationData, token, locationSchema);
  },

  getLocations: async (token: string, offset = 0, limit = 20): Promise<LocationPaginatedResponse> => {
    const url = `${base_url}/locations/?offset=${offset}&limit=${limit}`;
    return makeFetchRequest(url, 'GET', null, token, locationPaginatedResponseSchema);
  },

  getLocationById: async (token: string, locationId: number): Promise<Location> => {
    return makeFetchRequest(`${base_url}/locations/${locationId}`, 'GET', null, token, locationSchema);
  },

  updateLocation: async (token: string, locationId: number, locationData: LocationCreate): Promise<Location> => {
    return makeFetchRequest(`${base_url}/locations/${locationId}`, 'PUT', locationData, token, locationSchema);
  },

  deleteLocation: async (token: string, locationId: number): Promise<{ message: string }> => {
    return makeFetchRequest(`${base_url}/locations/${locationId}`, 'DELETE', null, token, z.object({ message: z.string() }));
  },
};
