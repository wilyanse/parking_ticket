import axiosInstance from "@/api/axios";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = "http://localhost:8000";

// API call to create a new parking location
export async function createParkingLocation(data: {
  name: string;
  location: string;
  description: string;
  user_id: number;
}) {
  const response = await axiosInstance.post(`${API_URL}/api/locations/`, data);

  return response.data;
}

// API call to get all parking locations
export async function getParkingLocations() {
  const response = await axiosInstance.get(`${API_URL}/api/locations/`);

  return response.data;
}

// API call to get a specific parking location by ID
export async function getParkingLocationById(id: string) {
  const response = await axiosInstance.get(`${API_URL}/api/locations/${id}/`);

  return response.data;
}

// API call to get parking locations by the current user
export async function getParkingLocationsByUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const user = currentUser.user_id;

  const response = await axiosInstance.get(
    `${API_URL}/api/locations/by_user/?user_id=${user}`,
  );

  return response.data;
}

// API calls to update, delete, and manage parking locations
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

// API calls to manage parking slots within a location
// These functions allow you to get all slots for a location, create a new slot, and
// delete a slot from a location.
export async function getParkingSlotsByLocation(locationId: string) {
  const response = await axiosInstance.get(
    `${API_URL}/api/locations/${locationId}/slots/`,
  );

  return response.data;
}

export async function createParkingSlot(locationId: string) {
  const response = await axiosInstance.post(
    `${API_URL}/api/locations/${locationId}/create_slot/`,
  );

  return response.data;
}

export async function deleteParkingSlot(locationId: string) {
  const response = await axiosInstance.delete(
    `${API_URL}/api/locations/${locationId}/delete_slot/`,
  );

  return response.data;
}

// API calls to manage reservations for parking slots
// These functions allow you to get reservations by slot ID, by owner, and by user.
export async function getReservationsBySlotId(slotId: string) {
  const response = await axiosInstance.get(
    `${API_URL}/api/slots/${slotId}/reservations`,
  );

  return response.data;
}

export async function getReservationsByOwner() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const user = currentUser.user_id;

  const response = await axiosInstance.get(
    `${API_URL}/api/reservations/by_owner/?owner_id=${user}`,
  );

  return response.data;
}

export async function getReservationsByUser() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const user = currentUser.user_id;

  const response = await axiosInstance.get(
    `${API_URL}/api/reservations/by_user/?user_id=${user}`,
  );

  return response.data;
}

// API calls to manage reservation status
export async function cancelReservationStatus(reservationId: string) {
  const response = await axiosInstance.patch(
    `${API_URL}/api/reservations/${reservationId}/`,
    { status: "cancelled" },
  );

  return response.data;
}

export async function createReservation(data: {
  start_time: string;
  end_time: string;
  parking_location: string;
  parking_slot: string;
}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const user = currentUser.user_id;

  const response = await axiosInstance.post(`${API_URL}/api/reservations/`, {
    ...data,
    user,
  });

  return response.data;
}
