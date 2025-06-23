import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-sm relative">
        <div className="text-2xl font-bold text-blue-600">PGPluse</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="hover:text-blue-600">Features</a>|
          <a href="#pglife" className="hover:text-blue-600">PG Life</a>|
          <a href="/faq" className="hover:text-blue-600">FAQ</a>|
          <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>|
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <Link to="/login" className="hidden md:inline-block">
          <button className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </Link>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg p-4 flex flex-col gap-4 z-10">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#pglife" className="hover:text-blue-600">PG Life</a>
            <a href="/faq" className="hover:text-blue-600">FAQ</a>
            <a href="/privacy" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                Login
              </button>
            </Link>
          </div>
        )}
      </header>

      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Effortless PG Management & Tenant Communication
          </h1>
          <p className="text-gray-600 mb-6">
            For tenants, owners, and staff — all in one place. Manage rooms, raise complaints, check facilities, and stay updated.
          </p>
          <Link to="/register">
            <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src="https://img.freepik.com/free-vector/house-rent-concept-illustration_114360-7074.jpg"
            alt="PG Illustration"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Manage Rooms</h3>
            <p className="text-sm text-gray-600">Easily add, update, and assign rooms to tenants.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Complaints Tracking</h3>
            <p className="text-sm text-gray-600">Raise issues and track their resolution status.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Announcements</h3>
            <p className="text-sm text-gray-600">Stay updated with news and daily food menus.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Facility Monitoring</h3>
            <p className="text-sm text-gray-600">Check PG facilities, equipment condition, and updates.</p>
          </div>
        </div>
      </section>

      {/* PG Life Section */}
      <section id="pglife" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Life at a PG, Simplified</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img 
              src="https://img.freepik.com/free-vector/student-hostel-concept-illustration_114360-13664.jpg" 
              alt="PG life illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Staying in a PG means adapting to shared spaces, facilities, and schedules. It can be fun and challenging at the same time.
              PGPluse ensures that tenants, staff, and owners stay connected — making life in your PG smooth, organized, and stress-free.
            </p>
            <p className="text-gray-600 mb-4">
              Whether it's raising a complaint about Wi-Fi, checking who your roommates are, or viewing the daily food menu —
              everything is just a click away with PGPluse.
            </p>
            <p className="text-gray-600">
              Owners and staff can track facilities, manage rooms, and keep everyone updated. PGPluse is built for modern PG living.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t p-6 text-center text-sm text-gray-500">
        PGPluse © 2025 | <a href="mailto:support@pgpluse.com" className="text-blue-600 hover:underline">support@pgpluse.com</a> | 
        <a href="/privacy" className="text-blue-600 hover:underline ml-2">Privacy Policy</a>
      </footer>
    </div>

  );
}
