"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Flights } from "../../../utils/mock_data";
import { useAuthStore } from "../../../lib/store";
import Plane from "../../../assets/svg/plane.svg";
import Money from "../../../assets/svg/money.svg";
import Image from "next/image";
import { toast } from "react-toastify";

const schema = z.object({
  destination: z.string().min(1, "El destino es requerido"),
  startDate: z.string({ required_error: "La fecha de inicio es requerida" }),
  endDate: z.string({ required_error: "La fecha destino es requerida" }),
  flightClass: z.string().min(1, "La clase de vuelo es requerida"),
  price: z.number().positive("El precio debe ser positivo"),
});

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
  flightClass: string;
  price: number;
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

  const setTrip = useAuthStore((state) => state.setTrip);

  React.useEffect(() => {
    const selectedDestination = watch("destination");

    const selectedFlight = Flights.find(
      (flight: { destination: string; class: string; priceUSD: number }) =>
        flight.destination === selectedDestination &&
        flight.class.toLowerCase() === watch("flightClass")
    );

    if (selectedFlight) {
      setValue("price", selectedFlight.priceUSD);
    }
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
      { id: Date.now().toString(), ...data, travelerCount: 1, travelers: [] },
    ]);
    setFormNumber(2);
  };

  const inputClass =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 pl-2";

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
      <p className="block text-xl font-medium text-gray-700 text-center mb-5">
        <strong>Bienvenido a Globettroter</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="flex justify-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Destino
            </label>

            <Image src={Plane} alt="Plane" width={15} height={15} />
          </div>
          <select
            {...register("destination", {
              required: "El destino es requerido",
            })}
            className={inputClass}
          >
            {Array.from(
              new Set(
                Flights.map(
                  (flight: { destination: string }) => flight.destination
                )
              )
            ).map((destination: string) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.destination.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de inicio
          </label>
          <input
            type="date"
            {...register("startDate", {
              required: "La fecha de inicio es requerida",
            })}
            className={inputClass}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.startDate.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha destino
          </label>
          <input
            type="date"
            {...register("endDate", {
              required: "La fecha destino es requerida",
            })}
            className={inputClass}
            min={
              watch("startDate")
                ? new Date(watch("startDate")).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.endDate.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Clase de vuelo
          </label>
          <select
            {...register("flightClass", {
              required: "La clase de vuelo es requerida",
            })}
            className={inputClass}
          >
            <option value="">Seleccione una clase</option>
            {Array.from(
              new Set(
                Flights.map((flight: { class: string }) =>
                  flight.class.toLowerCase()
                )
              )
            ).map((flightClass: string) => (
              <option key={flightClass} value={flightClass}>
                {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
              </option>
            ))}
          </select>
          {errors.flightClass && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.flightClass.message)}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>

            <Image src={Money} alt="Money" width={15} height={15} />
          </div>
          <div className="relative">
            <input
              type="number"
              {...register("price", { required: "El precio es requerido" })}
              className={inputClass}
              readOnly
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.price.message)}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default FirstFlightForm;
