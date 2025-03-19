"use client";
import Image from "next/image";
import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { X } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-white shadow-md">
      <div className="flex justify-between items-center p-4 border-b">
        {/* Logo + Desktop Menu */}
        <div className="flex items-center space-x-14  ">
          <Image
            src="/logo-title.png"
            alt="Profile"
            width={110}  
            height={48} 
            className="  sm:block rounded-full mr-3"
          />

          {/* Desktop Menu */}
          <ul className="hidden   md:flex space-x-6 text-[#394A8F] font-medium ">
            <li className="cursor-pointer hover:text-blue-600 transition">
              Contacto
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              Sobre nosotros
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition">
              Ayuda
            </li>
          </ul>
        </div>
        {/* Profile + Mobile Menu Button */}
        <div className="flex items-center">
          <Image
            src="/profile.png"
            alt="Profile"
            width={200}
            height={200}
            className="w-12 h-12 hidden sm:block  rounded-full mr-3 "
          />
          <button
            className="md:hidden w-15 h-15 p-2 flex items-center justify-center rounded-full bg-[#F6FDFF]  border-none shadow-md   transition"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-[#283B72]" />
            ) : (
              <HiMenuAlt1
                size={15}
                className="w-10 h-10 text-[#283B72] text-xs  "
              />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden z-50`}
      >
        <button
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
          onClick={toggleMenu}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        <ul className="flex flex-col items-center mt-20 space-y-6 text-xl text-[#394A8F] font-medium">
          <li className="cursor-pointer hover:text-blue-600 transition">
            Contacto
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition">
            Sobre nosotros
          </li>
          <li className="cursor-pointer hover:text-blue-600 transition">
            Ayuda
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
