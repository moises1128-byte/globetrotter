import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Traveler {
  birthDate: string; // timestamp
  idDocument: string;
  idDocumentType: string;
  fullName: string;
  hasPet?: boolean;
  petCount?: number;
  hasExtraBags?: boolean;
  extraBagsCount?: number;
  hasTravelInsurance?: boolean;
  hasPreferredSeats?: boolean;
  needsSpecialAssistance?: boolean;
}

interface Trip {
  id: string;
  destination: string;
  startDate: string; // timestamp
  endDate: string; // timestamp
  flightClass: string;
  price: number;
  travelerCount: number;
  travelers: Traveler[];
  totalPrice: number; // Precio total del viaje
  FlightNumber: string; // Número de vuelo
}

interface AuthState {
  trips: Trip[];
  numberOfTrips: Trip[]; // Arreglo de objetos para rastrear los viajes
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  setTrip: (trips: Trip[]) => void;
  saveIndividualTrip: (trip: Trip) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      trips: [], // Arreglo que almacena los viajes completos
      numberOfTrips: [], // Arreglo que almacena un resumen de los viajes

      addTrip: (trip: Trip) => {
        console.log("addTrip", trip);
        set((state) => ({
          trips: [...state.trips, trip],
        }));
      },
      updateTrip: (id, updatedFields) => {
        console.log("updateTrip", id, updatedFields);
        return new Promise<void>((resolve) => {
          set((state) => {
            const updatedTrips = state.trips.map((trip) =>
              trip.id === id ? { ...trip, ...updatedFields } : trip
            );
            resolve(); // Resuelve la promesa después de actualizar el estado
            return { trips: updatedTrips };
          });
        });
      },
      setTrip: (trips) => {
        console.log("setTrip", trips);
        set(() => ({
          trips,
        }));
      },
      saveIndividualTrip: (trip: Trip) => {
        console.log("saveIndividualTrip", trip);
        set((state) => ({
          numberOfTrips: [...state.numberOfTrips, trip], // Agrega el nuevo viaje al arreglo existente
        }));
      },
    }),
    {
      name: "globetrotter-storage",
    }
  )
);
