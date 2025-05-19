"use client";
import React, { useState } from "react";
import FirstFlightForm from "./components/FirstFlightForm";
import SecondFlightForm from "./components/SecondFlightForm";
import ResumeFlightForm from "./components/ResumeFlightForm";
import CompleteScreen from "./components/CompleteScreen";
import { ToastContainer } from "react-toastify";
// import { useWindowSize } from "@uidotdev/usehooks";

export default function Home() {
  const [formNumber, setFormNumber] = useState(1);
  // const size = useWindowSize();

  // console.log("Window size2:", size);

  // height: 544;
  // width: 1618;

  // height: 330;
  // width: 1492;

  return (
    <div className="min-h-screen flex items-center justify-center px-10 md:py-10">
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
