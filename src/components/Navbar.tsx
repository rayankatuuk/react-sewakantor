import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white w-full border-b border-[#E0DEF7] relative z-50">
      <div className="flex items-center justify-between w-full max-w-[1130px] py-[22px] mx-auto px-4 lg:px-0">
        {/* Logo */}
        <Link to={`/`}>
          <img
            src="/assets/images/logos/logo.png"
            alt="logo"
            className="h-8 md:h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-[50px] w-fit">
          <li>
            <Link
              to={`/`}
              className="font-semibold hover:text-[#0D903A] transition-colors"
            >
              Browse
            </Link>
          </li>
          <li>
            <a
              href=""
              className="font-semibold hover:text-[#0D903A] transition-colors"
            >
              Popular
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-semibold hover:text-[#0D903A] transition-colors"
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-semibold hover:text-[#0D903A] transition-colors"
            >
              Events
            </a>
          </li>
          <li>
            <Link
              to="/check-booking"
              className="font-semibold hover:text-[#0D903A] transition-colors"
            >
              My Booking
            </Link>
          </li>
        </ul>

        {/* Desktop Contact Button */}
        <a
          href="#"
          className="hidden lg:flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5 hover:bg-[#000929] hover:text-white transition-all duration-300"
        >
          <img
            src="/assets/images/icons/call.svg"
            className="w-6 h-6"
            alt="icon"
          />
          <span className="font-semibold">Contact Us</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {!open ? (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#000929"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#000929"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[#E0DEF7] shadow-lg">
          <div className="max-w-[1130px] mx-auto px-4 py-6 max-[639px]:px-6 flex flex-col text-xs">
            <ul className="flex flex-col gap-4 mb-6">
              <li>
                <Link
                  to={`/`}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-semibold text-lg hover:text-[#0D903A] transition-colors max-[639px]:text-sm"
                >
                  Browse
                </Link>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => setOpen(false)}
                  className="block py-2 font-semibold text-lg hover:text-[#0D903A] transition-colors max-[639px]:text-sm"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => setOpen(false)}
                  className="block py-2 font-semibold text-lg hover:text-[#0D903A] transition-colors max-[639px]:text-sm"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => setOpen(false)}
                  className="block py-2 font-semibold text-lg hover:text-[#0D903A] transition-colors max-[639px]:text-sm"
                >
                  Events
                </a>
              </li>
              <li>
                <Link
                  to="/check-booking"
                  onClick={() => setOpen(false)}
                  className="block py-2 font-semibold text-lg hover:text-[#0D903A] transition-colors max-[639px]:text-sm"
                >
                  My Booking
                </Link>
              </li>
            </ul>
            <a
              href="#"
              className="flex items-center justify-center gap-2 rounded-full border border-[#000929] py-3 px-5 font-semibold hover:bg-[#000929] hover:text-white transition-all duration-300"
            >
              <img
                src="/assets/images/icons/call.svg"
                className="w-5 h-5"
                alt="icon"
              />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
