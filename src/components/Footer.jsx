import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-12">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Grid for Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-lg text-gray-300 hover:text-white transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/find-tutors" className="text-lg text-gray-300 hover:text-white transition duration-300">Find Tutors</Link>
              </li>
              <li>
                <Link to="/add-tutorials" className="text-lg text-gray-300 hover:text-white transition duration-300">Add Tutorials</Link>
              </li>
              <li>
                <Link to="/my-tutorials" className="text-lg text-gray-300 hover:text-white transition duration-300">My Tutorials</Link>
              </li>
              <li>
                <Link to="/my-booked-tutors" className="text-lg text-gray-300 hover:text-white transition duration-300">My Booked Tutors</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-300 hover:text-blue-500 transition duration-300">
                <FaFacebook />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-300 hover:text-blue-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-300 hover:text-pink-500 transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-300 hover:text-blue-700 transition duration-300">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-lg text-gray-300">Tutors: <span className="text-white font-semibold">1000+</span></div>
              <div className="text-lg text-gray-300">Reviews: <span className="text-white font-semibold">5000+</span></div>
              <div className="text-lg text-gray-300">Languages: <span className="text-white font-semibold">25</span></div>
              <div className="text-lg text-gray-300">Users: <span className="text-white font-semibold">5000+</span></div>
            </div>
          </div>

          {/* Language Categories */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Explore Categories</h3>
            <ul className="space-y-4">
              {["English", "Math", "Science", "History", "Art", "Programming", "Music", "Spanish", "French"].map((category, index) => (
                <li key={index} className="flex justify-between items-center group">
                  <div className="text-lg text-gray-300">{category}</div>
                  <Link to={`/find-tutors/${category.toLowerCase()}`} className="text-blue-500 group-hover:text-blue-700 transition duration-300">
                    <FiArrowRight className="text-xl" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TutorBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
