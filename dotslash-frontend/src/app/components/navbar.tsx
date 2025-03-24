"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

import logo from "../assets/navbar_logo.svg"; // Make sure the path is correct
import Link from "next/link";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close menu if clicking outside and menu is open
      if (menuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`z-[1000] fixed top-0 left-0 w-full h-[68px] bg-transparent duration-300 ${
        hidden ? "-translate-y-[100px]" : "translate-y-0"
      }`}
    >
      <div className={`bg-[#C49A32] text-black m-3 py-3 px-6 h-[68px] flex items-center justify-between duration-300 ${menuOpen?`rounded-t-[8px]`:`rounded-[8px]`}  relative`}>
        {/* Logo Section */}
        <Link href="/" className="flex items-center" >
          <Image src={logo} alt="Logo" width={180} height={180} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {/* <Link href="/#events" className="hover:underline font-unbounded">
          Events
          </Link> */}
          <Link href="/#gallery" className="hover:underline font-unbounded">
          Gallery
          </Link>
          <Link href="/events" target="_blank" className="bg-black text-[#C49A32] px-10 py-2 rounded-full font-medium font-unbounded hover:opacity-80 group relative overflow-hidden">
            <div className="group-hover:-translate-y-11 ease-in-out-expo transition duration-700 ease-[cubic-bezier(0, 0, 0, 1)]">
              Events
            </div>
            <div className="absolute left-0 top-16 group-hover:top-0 transition-all delay-75 duration-700 ease-in-out-expo text-black bg-[#D1A83A] w-full h-full flex items-center justify-center rounded-full border-black border-[2px]">
              Events
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu - Dropdown from navbar */}
        <div
          className={`mobile-menu absolute top-full w-full left-0 right-0 bg-[#C49A32] rounded-b-[8px] flex flex-col items-center gap-6 py-6 transition-all duration-300 shadow-lg md:hidden ${
            menuOpen 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {/* <Link
            href="/#events" 
            className="hover:underline font-unbounded text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link> */}
          <Link
            href="/#gallery" 
            className="hover:underline font-unbounded text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/events"
            className="bg-black text-[#C49A32] px-10 py-2 rounded-full font-medium font-unbounded hover:opacity-80 text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;