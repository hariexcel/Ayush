import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const fetchPatientData = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch patient data');
  }
};

export const scheduleAppointment = async (patientId, appointmentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/patient/${patientId}/appointments`,
      appointmentData
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to schedule appointment');
  }
};