"use client";
import React from "react";
import doneAnimation from "../../../assets/animations/done_animation.json";
import { useAuthStore } from "../../../lib/store";
import dynamic from "next/dynamic";
interface CompleteScreen {
  setFormNumber: (formNumber: number) => void;
}

const CompleteScreen: React.FC<CompleteScreen> = ({ setFormNumber }) => {
  const trips = useAuthStore((state) => state.trips);

  const lastTrip = trips[trips.length - 1];

  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: doneAnimation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <div className="bg-white p-10 rounded-lg  text-gray-700 w-4xl">
      <div className="flex justify-center self-center">
        {/* <Lottie
          className="w-50 h-50"
          animationData={doneAnimation}
          loop={true}
        /> */}

        <Lottie
          animationData={doneAnimation}
          loop={true}
          autoplay={true}
          className="w-50 h-50"
        />
      </div>
      <div className="text-center mb-4">
        <p>
          <strong>Vuelo Confirmado Con Exito !</strong>
        </p>
        <p>Numero de ticket: #{lastTrip.FlightNumber}</p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        onClick={() => {
          setFormNumber(1);
          window.location.href = "/Vuelos";
        }}
      >
        Continuar
      </button>
    </div>
  );
};

export default CompleteScreen;
