"use client";
import React, { useState } from "react";
import FirstFlightForm from "./components/FirstFlightForm";
import SecondFlightForm from "./components/SecondFlightForm";
import ResumeFlightForm from "./components/ResumeFlightForm";
import CompleteScreen from "./components/CompleteScreen";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [formNumber, setFormNumber] = useState(1);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <ToastContainer />
      {formNumber === 1 ? (
        <FirstFlightForm setFormNumber={setFormNumber} />
      ) : formNumber === 2 ? (
        <SecondFlightForm setFormNumber={setFormNumber} />
      ) : formNumber === 3 ? (
        <ResumeFlightForm setFormNumber={setFormNumber} toast={toast} />
      ) : (
        <CompleteScreen setFormNumber={setFormNumber} />
      )}
    </div>
  );
}
