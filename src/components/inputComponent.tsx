"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

import {
  UseFormRegister,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";

type Flight = {
  destination: string;
  class: string;
};

type InputComponentProps<T extends FieldValues> = {
  Icon?: string | StaticImageData;
  Title: string;
  register: UseFormRegister<T>;
  watch?: ((name: Path<T>) => unknown);
  Flights?: Array<Flight>;
  errors?: FieldError | undefined;
  type: string;
  name: Path<T>;
  min?: string;
  required: string;
  value?: boolean;
  arraySelection?: string;
};

const InputComponent = <T extends FieldValues>({
  Icon,
  Title,
  register,
  Flights,
  errors,
  type,
  name,
  min,
  required,
  value,
  arraySelection,
  watch,
}: InputComponentProps<T>) => {
  const inputClass =
    "mt-1 block w-full rounded-md border-gray-50 border-[2px] focus:outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700 px-2 h-10";
  return (
    <div>
      <div className="flex justify-start gap-2">
        <label className="block text-sm font-medium text-gray-700">
          <strong>{Title}</strong>
        </label>

        {Icon && <Image src={Icon} alt={Title} width={15} height={15} />}
      </div>

      {type === "select" ? (
        <>
          <select
            {...register(name, {
              required: required,
            })}
            className={inputClass}
          >
            {value === true ? (
              <option value="">Seleccione una clase</option>
            ) : (
              <></>
            )}
            {arraySelection === "flightClass" ? (
              <>
                {Array.from(
                  new Set(
                    (Flights ?? []).map((flight: { class: string }) =>
                      flight.class.toLowerCase()
                    )
                  )
                ).map((flightClass: string) => (
                  <option key={flightClass} value={flightClass}>
                    {flightClass.charAt(0).toUpperCase() + flightClass.slice(1)}
                  </option>
                ))}
              </>
            ) : (
              <>
                {Array.from(
                  new Set(
                    (Flights ?? []).map(
                      (flight: { destination: string }) => flight.destination
                    )
                  )
                ).map((destination: string) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </>
            )}
          </select>
          {errors && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.message)}
            </p>
          )}
        </>
      ) : type === "input" ? (
        <>
          <input
            type="number"
            {...register(name)}
            className={inputClass}
            readOnly
            placeholder="$$$"
            value={watch ? String(watch(name) ?? "") : ""}
          />
        </>
      ) : (
        <>
          <input
            type="date"
            {...register(name, {
              required: required,
            })}
            className={inputClass}
            min={min}
          />
          {errors && (
            <p className="text-red-500 text-xs mt-1">
              {String(errors.message)}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default InputComponent;
