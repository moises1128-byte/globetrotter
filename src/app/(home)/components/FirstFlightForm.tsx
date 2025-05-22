"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../../../lib/store";
import Plane from "../../../assets/svg/plane.svg";
import Money from "../../../assets/svg/money.svg";
import { toast } from "react-toastify";
import InputComponent from "@/components/inputComponent";
import { getFlights } from "@/lib/flights";

const schema = z.object({
  destination: z.string().min(1, "El destino es requerido"),
  startDate: z.string({ required_error: "La fecha de inicio es requerida" }),
  endDate: z.string({ required_error: "La fecha destino es requerida" }),
  flightClass: z.string().min(1, "La clase de vuelo es requerida"),
  price: z.number().optional(),
});

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  flightClass: string;
  price?: number;
}
interface FirstFlightForm {
  setFormNumber: (formNumber: number) => void;
}

const FirstFlightForm: React.FC<FirstFlightForm> = ({ setFormNumber }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  interface Flight {
    destination: string;
    class: string;
    priceUSD: number;
  }

  const [flights, setFlights] = React.useState<Flight[]>([]);

  React.useEffect(() => {
    const fetchFlights = async () => {
      const flightsData = await getFlights();
      setFlights(flightsData);
    };
    fetchFlights();
  }, []);

  const setTrip = useAuthStore((state) => state.setTrip);

  React.useEffect(() => {
    const fetchFlight = async () => {
      const selectedDestination = watch("destination");

      const flightsData = await flights;
      const selectedFlight = flightsData.find(
        (flight: { destination: string; class: string; priceUSD: number }) =>
          flight.destination === selectedDestination &&
          flight.class.toLowerCase() === watch("flightClass")
      );

      if (selectedFlight) {
        setValue("price", selectedFlight.priceUSD);
      }
    };

    fetchFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("destination"), watch("flightClass"), setValue]);

  const onSubmit = (data: FormData) => {
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    if (!startDate || !endDate) {
      toast.error("Por favor llene todos los datos antes de continuar");
      return;
    }

    toast.success("Se han guardado los datos del vuelo con éxito!");
    setTrip([
      {
        id: Date.now().toString(),
        ...data,
        price: data.price ?? 0,
        travelerCount: 1,
        travelers: [],
        totalPrice: 0,
        FlightNumber: "",
      },
    ]);
    setFormNumber(2);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-4xl transition-all duration-300 hover:shadow-2xl ">
      <p className="block text-xl font-medium text-gray-700 text-center mb-5">
        <strong>Bienvenido a Globettroter</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <InputComponent
          Icon={Plane}
          Title="Destino"
          register={register}
          Flights={flights}
          errors={errors.destination}
          type="select"
          name="destination"
          required="El destino es requerido"
          value={false}
          arraySelection="destination"
        />

        <InputComponent
          Title="Fecha de inicio"
          register={register}
          errors={errors.startDate}
          type="date"
          name="startDate"
          min={new Date().toISOString().split("T")[0]}
          required="La fecha de inicio es requerida"
        />

        <InputComponent
          Title="Fecha de destino"
          register={register}
          errors={errors.endDate}
          type="date"
          name="endDate"
          min={
            watch("startDate")
              ? new Date(watch("startDate")).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          required="La fecha destino es requerida"
        />

        <InputComponent
          Title="Clase de vuelo"
          register={register}
          Flights={flights}
          errors={errors.flightClass}
          type="select"
          name="flightClass"
          required="La clase de vuelo es requerida"
          value={true}
          arraySelection="flightClass"
        />

        <InputComponent
          Title="Precio"
          register={register}
          type="input"
          name="price"
          required="El precio es requerido"
          Icon={Money}
          watch={watch}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-500"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default FirstFlightForm;
