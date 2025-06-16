import axiosInstance from "@/api/axios";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000";

export async function createParkingLocation(data: {
  name: string;
  location: string;
  description: string;
  user_id: number;
}) {
  const response = await axiosInstance.post(`${API_URL}/api/locations/`, data);

  return response.data;
}

export async function getParkingLocations() {
  const response = await axiosInstance.get(`${API_URL}/api/locations/`);

  return response.data;
}

export async function getParkingLocationById(id: string) {
  const response = await axiosInstance.get(`${API_URL}/api/locations/${id}/`);

  return response.data;
}

export async function updateParkingLocation(
  id: string,
  data: { name?: string; location?: string; description?: string },
) {
  const response = await axiosInstance.patch(
    `${API_URL}/api/locations/${id}/`,
    data,
  );

  return response.data;
}

export async function deleteParkingLocation(id: string) {
  const response = await axiosInstance.delete(
    `${API_URL}/api/locations/${id}/`,
  );

  return response.data;
}

export async function getParkingSlotsByLocation(locationId: string) {
  const response = await axiosInstance.get(
    `${API_URL}/api/locations/${locationId}/slots/`,
  );

  return response.data;
}
