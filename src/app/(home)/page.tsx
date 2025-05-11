"use client";
import React, { useState } from "react";
import FirstFlightForm from "./components/FirstFlightForm";
import SecondFlightForm from "./components/SecondFlightForm";
import ResumeFlightForm from "./components/ResumeFlightForm";
import CompleteScreen from "./components/CompleteScreen";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [formNumber, setFormNumber] = useState(1);
  return (
    <div className="min-h-screen flex items-center justify-center px-10 py-10">
      <ToastContainer />
      {formNumber === 1 ? (
        <FirstFlightForm setFormNumber={setFormNumber} />
      ) : formNumber === 2 ? (
        <SecondFlightForm setFormNumber={setFormNumber} />
      ) : formNumber === 3 ? (
        <ResumeFlightForm setFormNumber={setFormNumber} />
      ) : (
        <CompleteScreen setFormNumber={setFormNumber} />
      )}
    </div>
  );
}
