"use client";
import React, { useCallback, useEffect, useState } from "react";
import Lottie from "lottie-react";
import doneAnimation from "../../../assets/animations/done_animation.json";

interface CompleteScreen {
  setFormNumber: (formNumber: number) => void;
}

const CompleteScreen: React.FC<CompleteScreen> = ({ setFormNumber }) => {
  const [ticketNumber, setTicketNumber] = useState<string>("");

  // Función para generar un string aleatorio de 8 dígitos

  const generateRandomTicket = useCallback(() => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }, []);

  useEffect(() => {
    // Generar el número de ticket al cargar el componente
    setTicketNumber(generateRandomTicket());
  }, [generateRandomTicket]);

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-gray-700">
      <div className="flex justify-center self-center">
        <Lottie
          className="w-50 h-50"
          animationData={doneAnimation}
          loop={true}
        />
      </div>
      <div className="text-center mb-4">
        <p>
          <strong>Vuelo Confirmado Con Exito !</strong>
        </p>
        <p>Numero de ticket: #{ticketNumber}</p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        onClick={() => setFormNumber(1)}
      >
        Continuar
      </button>
    </div>
  );
};

export default CompleteScreen;
