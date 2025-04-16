import axios from "axios";
import { TouristSpot, Hotel, Restaurant, Transport, UserRegister, UserLogin } from "../lib/types";

const API_BASE_URL = "http://localhost:8080/api";

// Existing
export const fetchTouristSpots = async (): Promise<TouristSpot[]> => {
  const response = await axios.get<TouristSpot[]>(`${API_BASE_URL}/touristspots`);
  return response.data;
};

// New: Hotels
export const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await axios.get<Hotel[]>(`${API_BASE_URL}/hotels`);
  return response.data;
};

// New: Restaurants
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get<Restaurant[]>(`${API_BASE_URL}/restaurants`);
  return response.data;
};

// New: Transport
export const fetchTransports = async (): Promise<Transport[]> => {
  const response = await axios.get<Transport[]>(`${API_BASE_URL}/transports`);
  return response.data;
};

import { RegisterPayload } from "../lib/types";

export const registerUser = async (userData: RegisterPayload) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

// ✅ Login User
export const loginUser = async (credentials: UserLogin) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

