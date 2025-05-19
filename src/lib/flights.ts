import axios from 'axios';

interface Flight {
  destination: string;
  class: string;
  priceUSD: number;
}

export const getFlights = async (): Promise<Flight[]> => {
  try {
    const response = await axios.get<Flight[]>(
      'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
}; 