"use client";
import { useAuthStore } from "../../lib/store";

import React from "react";

export default function Home() {
  const numberOfTrips = useAuthStore((state) => state.numberOfTrips);

  console.log(numberOfTrips, "test");

  return (
    <div className="min-h-screen flex items-center justify-center px-10 md:py-10">
      <div
        className="bg-white p-10 rounded-lg shadow-lg  w-4xl"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <p className="text-gray-700 underline">
          <strong>Mis Vuelos</strong>
        </p>
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                # Vuelo
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Destino
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Fecha de Inicio
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Fecha de Regreso
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Pasajeros
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {numberOfTrips.map((trip, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  {trip.FlightNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  {trip.destination}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  {trip.startDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  {trip.endDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  {trip.travelers.length}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                  ${trip.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
