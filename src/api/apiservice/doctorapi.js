// src/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';  // URL for your backend API

// Function to get doctor data
export const getDoctorData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return the list of doctor data
  } catch (error) {
    console.error('There was an error fetching the doctor data!', error);
    return [];
  }
};
