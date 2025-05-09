"use client";
import React, { useCallback, useEffect, useState } from "react";

import { useAuthStore } from "../../../lib/store";

interface ResumeFlightFormProps {
  setFormNumber: (formNumber: number) => void;
  toast: (message: string) => void;
}

// Asegurar que el tipo Traveler esté correctamente definido
interface Traveler {
  id: string;
  fullName: string;
  birthDate: string;
  idDocument: string;
  idDocumentType: string;
  hasPet: boolean;
  petCount: number;
  hasExtraBags: boolean;
  extraBagsCount: number;
  hasTravelInsurance: boolean;
  hasPreferredSeats: boolean;
  needsSpecialAssistance: boolean;
  specialAssistanceDetails: string;
}

const ResumeFlightForm: React.FC<ResumeFlightFormProps> = ({
  setFormNumber,
  toast,
}) => {
  const trips = useAuthStore.getState().trips.map((trip) => ({
    ...trip,
    travelers: trip.travelers.map((traveler: Partial<Traveler>) => ({
      id: traveler.id || "",
      fullName: traveler.fullName || "",
      birthDate: traveler.birthDate || "",
      idDocument: traveler.idDocument || "",
      idDocumentType: traveler.idDocumentType || "",
      hasPet: traveler.hasPet || false,
      petCount: traveler.petCount || 0,
      hasExtraBags: traveler.hasExtraBags || false,
      extraBagsCount: traveler.extraBagsCount || 0,
      hasTravelInsurance: traveler.hasTravelInsurance || false,
      hasPreferredSeats: traveler.hasPreferredSeats || false,
      needsSpecialAssistance: traveler.needsSpecialAssistance || false,
      specialAssistanceDetails: traveler.specialAssistanceDetails || "",
    })),
  }));
  const lastTrip = trips[trips.length - 1];

  const calculateTotalViajero = useCallback(
    (traveler: Traveler) => {
      const petCost = traveler.hasPet ? traveler.petCount * 100 : 0;
      const flightPrice = lastTrip.price || 0; // Asegúrate de que el precio esté definido

      const extraBagsCost = traveler.hasExtraBags
        ? traveler.extraBagsCount * 50
        : 0;
      return petCost + extraBagsCost + flightPrice;
    },
    [lastTrip.price]
  );

  const calculateTotal = useCallback(() => {
    const totalViajeros = lastTrip.travelers.reduce((total, traveler) => {
      return total + calculateTotalViajero(traveler);
    }, 0);
    return totalViajeros;
  }, [calculateTotalViajero, lastTrip.travelers]);

  const inputClass = "sm:text-sm text-gray-700 pl-2";

  const saveIndividualTrip = useAuthStore((state) => state.saveIndividualTrip);
  const updateTrip = useAuthStore((state) => state.updateTrip);

  const [ticketNumber, setTicketNumber] = useState<string>("");

  // Función para generar un string aleatorio de 8 dígitos

  const generateRandomTicket = useCallback(() => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }, []);

  const handleSubmit = () => {
    saveIndividualTrip(lastTrip);
    setFormNumber(4);

    updateTrip(lastTrip.id, {
      totalPrice: calculateTotal(),
      FlightNumber: ticketNumber,
    });

    toast("Vuelo confirmado con éxito !");
  };

  useEffect(() => {
    // Generar el número de ticket al cargar el componente
    setTicketNumber(generateRandomTicket());
  }, [generateRandomTicket]);

  return (
    <div
      className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      <h2 className="text-2xl font-medium text-gray-700">
        <strong>Resumen del Viaje</strong>
      </h2>
      {lastTrip ? (
        <div>
          <p className="text-base font-medium text-gray-700 mb-4">
            <strong>Número de viajeros:</strong> {lastTrip.travelerCount}
          </p>
          {trips.map((element, index) => (
            <React.Fragment key={index}>
              <div className="mb-4">
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Destino:
                  </strong>{" "}
                  {element.destination}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Fecha de Inicio:
                  </strong>{" "}
                  {element.startDate}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Fecha de Destino::
                  </strong>{" "}
                  {element.endDate}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Clase de Vuelo:
                  </strong>{" "}
                  {element.flightClass}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Costo de Destino:
                  </strong>{" "}
                  ${element.price}
                </p>
              </div>
            </React.Fragment>
          ))}

          {lastTrip.travelers.map((traveler, index: number) => (
            <React.Fragment key={index}>
              <div className="mb-4">
                <h3 className="text-base font-medium text-gray-700">
                  <strong>Viajero {index + 1}</strong>
                </h3>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Nombre:
                  </strong>{" "}
                  {traveler.fullName}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Fecha de Nacimiento:
                  </strong>{" "}
                  {traveler.birthDate}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Documento de Identidad:
                  </strong>{" "}
                  {traveler.idDocumentType}
                  {traveler.idDocument}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Mascotas:
                  </strong>{" "}
                  {traveler.hasPet ? traveler.petCount : 0}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Maletas Extras:
                  </strong>{" "}
                  {traveler.hasExtraBags ? traveler.extraBagsCount : 0}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Seguro de Viaje:
                  </strong>{" "}
                  {traveler.hasTravelInsurance ? "Sí" : "No"}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Asientos Preferenciales:
                  </strong>{" "}
                  {traveler.hasPreferredSeats ? "Sí" : "No"}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Asistencia Especial:
                  </strong>{" "}
                  {traveler.needsSpecialAssistance
                    ? traveler.specialAssistanceDetails
                    : "No"}
                </p>
                <p className={inputClass}>
                  <strong className="text-sm font-medium text-gray-700">
                    Total Viajero: ${calculateTotalViajero(traveler)}
                  </strong>{" "}
                </p>
              </div>
            </React.Fragment>
          ))}
          <hr className="my-4" />
          <p className="text-xl font-bold text-gray-700">
            Total a Pagar: ${calculateTotal()}
          </p>

          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 cursor-pointer"
          >
            Finalizar
          </button>
        </div>
      ) : (
        <p>No hay datos de viaje disponibles.</p>
      )}
    </div>
  );
};

export default ResumeFlightForm;
