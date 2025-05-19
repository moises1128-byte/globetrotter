"use client";
import Image from "next/image";
import React from "react";
import Logo from "../assets/png/Logo.png";
import Link from "next/link";

type NavBarComponentProps = unknown;

const navBarComponent: React.FC<NavBarComponentProps> = () => {
  return (
    <div className="flex justify-between items-center aling-center px-8">
      <div style={{ position: "relative", bottom: "10px" }}>
        <Image src={Logo} alt="Logo" width={200} height={200} />
      </div>
      <div className="pr-4 flex flex-row gap-4 items-center max-sm:flex-col max-sm:text-center max-sm:gap-2">
        <Link href="/">
          <strong>
            <p className="hover:text-indigo-500 transition-colors duration-500 text-gray-700">
              Inicio
            </p>
          </strong>
        </Link>

        <Link href="/Vuelos">
          <strong>
            <p className="hover:text-indigo-500 transition-colors duration-500 text-gray-700">
              Mis Vuelos
            </p>
          </strong>
        </Link>
      </div>
    </div>
  );
};

export default navBarComponent;
