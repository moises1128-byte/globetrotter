"use client";
import React, { useCallback } from "react";
import { useAuthStore } from "../../../lib/store";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import User from "../../../assets/svg/user.svg";
import { toast } from "react-toastify";

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
interface SecondFlightFormProps {
  setFormNumber: (formNumber: number) => void;
}

const SecondFlightForm: React.FC<SecondFlightFormProps> = ({
  setFormNumber,
}) => {
  const [FlightUsers, setFlightUsers] = React.useState<number | null>(null);

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      travelers: [
        {
          id: "",
          fullName: "",
          birthDate: "",
          idDocumentType: "",
          idDocument: "",
          hasPet: false,
          petCount: 0,
          hasExtraBags: false,
          extraBagsCount: 0,
          hasTravelInsurance: false,
          hasPreferredSeats: false,
          needsSpecialAssistance: false,
          specialAssistanceDetails: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelers",
  });

  const updateTrip = useAuthStore((state) => state.updateTrip);

  const onSubmit = useCallback(
    (data: { travelers: Traveler[] }) => {
      toast.success("Se han guardado los datos del vuelo con exito !");

      const lastTrip =
        useAuthStore.getState().trips[useAuthStore.getState().trips.length - 1];
      if (lastTrip) {
        updateTrip(lastTrip.id, {
          travelerCount: data.travelers.length,
          travelers: data.travelers,
        });
      }
      setFormNumber(3);
    },
    [setFormNumber, updateTrip]
  );

  const inputClass =
    "mt-1 block w-full rounded-md border-gray-100 border-[2px] focus:outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-500 focus:text-indigo-700 hover:text-indigo-700 transition-colors duration-500 hover:cursor-pointer sm:text-sm text-gray-700 px-2 h-10 border";

  return (
    <div
      className="bg-white p-10 rounded-lg shadow-lg w-4xl transition-all duration-300 hover:shadow-2xl"
      style={{ maxHeight: "700px", overflowY: "auto" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <label className="block text-xl font-medium text-gray-700">
            <strong>Número de viajeros</strong>
          </label>
          <input
            type="number"
            min={0}
            max={10}
            onChange={(e) => {
              let count = parseInt(e.target.value, 10);
              if (count > 10) {
                count = 10;
                e.target.value = "10";
                toast.warn("El número máximo de viajeros es 10.");
              }
              const currentCount = fields.length;
              setFlightUsers(e.target.value ? count : null);
              if (count !== currentCount) {
                remove();
                for (let i = 0; i < count; i++) {
                  append({
                    id: Date.now().toString() + i,
                    fullName: "",
                    birthDate: "",
                    idDocumentType: "",
                    idDocument: "",
                    hasPet: false,
                    petCount: 0,
                    hasExtraBags: false,
                    extraBagsCount: 0,
                    hasTravelInsurance: false,
                    hasPreferredSeats: false,
                    needsSpecialAssistance: false,
                    specialAssistanceDetails: "",
                  });
                }
              }
            }}
            className={inputClass}
          />
        </div>

        {FlightUsers && FlightUsers > 0 ? (
          <>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4">
                <hr className="my-4" />

                <div className="flex justify-start gap-2">
                  <Image src={User} alt="User" width={25} height={25} />
                  <h3 className="text-lg font-medium text-gray-900">
                    Viajero {index + 1}
                  </h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <strong>Nombre completo</strong>
                  </label>
                  <input
                    type="text"
                    {...register(`travelers.${index}.fullName`, {
                      required: true,
                    })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <strong>Fecha de nacimiento</strong>
                  </label>
                  <input
                    type="date"
                    {...register(`travelers.${index}.birthDate`, {
                      required: true,
                    })}
                    className={inputClass}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <strong>Documento de identidad</strong>
                  </label>
                  <div className="flex gap-2 items-center">
                    <div className="w-1/3">
                      <select
                        {...register(`travelers.${index}.idDocumentType`, {
                          required: true,
                        })}
                        className={inputClass}
                      >
                        <option value="">Selecciona</option>
                        <option value="Pasaporte-">Pasaporte</option>
                        <option value="V-">Cédula</option>
                        <option value="J-">Rif</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <input
                        type="text"
                        {...register(`travelers.${index}.idDocument`, {
                          required: true,
                        })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-5 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      ¿Viajas con Mascota?
                    </label>
                    <input
                      type="checkbox"
                      {...register(`travelers.${index}.hasPet`)}
                      className="mt-1 cursor-pointer"
                    />
                  </div>
                  {watch(`travelers.${index}.hasPet`) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        <strong>Cantidad de mascotas</strong>
                      </label>
                      <input
                        type="number"
                        {...register(`travelers.${index}.petCount`)}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex gap-5 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      ¿Necesitas maletas extras?
                    </label>
                    <input
                      type="checkbox"
                      {...register(`travelers.${index}.hasExtraBags`)}
                      className="mt-1 cursor-pointer"
                    />
                  </div>
                  {watch(`travelers.${index}.hasExtraBags`) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        <strong>¿Cantidad de maletas extras?</strong>
                      </label>
                      <input
                        type="number"
                        {...register(`travelers.${index}.extraBagsCount`)}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Deseas agregar seguro de viaje?
                  </label>
                  <input
                    type="checkbox"
                    {...register(`travelers.${index}.hasTravelInsurance`)}
                    className="mt-1 cursor-pointer"
                  />
                </div>

                <div className="flex gap-5">
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Deseas seleccionar asientos preferenciales?
                  </label>
                  <input
                    type="checkbox"
                    {...register(`travelers.${index}.hasPreferredSeats`)}
                    className="mt-1 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex gap-5 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      ¿Requiere asistencia especial?
                    </label>
                    <input
                      type="checkbox"
                      {...register(`travelers.${index}.needsSpecialAssistance`)}
                      className="mt-1 cursor-pointer"
                    />
                  </div>
                  {watch(`travelers.${index}.needsSpecialAssistance`) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Detalles de asistencia especial
                      </label>
                      <textarea
                        {...register(
                          `travelers.${index}.specialAssistanceDetails`
                        )}
                        className={inputClass}
                        maxLength={200}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-red-500 text-xs mt-1">
            Porfavor ingrese la cantidad de viajeros que van a ir en el vuelo.
          </p>
        )}

        {FlightUsers !== null && FlightUsers > 0 ? (
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-500"
          >
            Confirmar
          </button>
        ) : (
          <div className="opacity-50 pointer-events-none">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-500"
            >
              Confirmar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecondFlightForm;
