"use client";
import Image from "next/image";
import React from "react";
import Logo from "../assets/png/Logo.png";
import Link from "next/link";

type NavBarComponentProps = unknown;

const navBarComponent: React.FC<NavBarComponentProps> = () => {
  return (
    <div className="flex justify-between items-center aling-center">
      <Image src={Logo} alt="Logo" width={200} height={200} />
      <div className="pr-4 flex flex-row gap-4 items-center">
        <Link href="/">
          <p
            className=" hover:underline hover:cursor-pointer
          "
          >
            Inicio
          </p>
        </Link>

        <Link href="/Vuelos">
          <p
            className=" hover:underline hover:cursor-pointer
          "
          >
            Mis Vuelos
          </p>
        </Link>
      </div>
    </div>
  );
};

export default navBarComponent;
