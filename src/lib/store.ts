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
}

interface AuthState {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  setTrip: (trips: Trip[]) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      trips: [],
      addTrip: (trip: Trip) => {
        set((state) => ({
          trips: [...state.trips, trip],
        }));
      },
      updateTrip: (id, updates) => {
        set((state) => ({
          trips: state.trips.map((trip) =>
            trip.id === id ? { ...trip, ...updates } : trip
          ),
        }));
      },
      setTrip: (trips) => {
        set(() => ({
          trips,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
