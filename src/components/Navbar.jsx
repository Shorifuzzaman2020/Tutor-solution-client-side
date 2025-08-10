
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../UserContext";
import { auth } from "../firebase.init";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Error signing out: ", err.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative">
      <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">Tutor Solution</Link>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Link
            to="/"
            className={`${isActive("/") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
          >
            Home
          </Link>
          <Link
            to="/find-tutors"
            className={`${isActive("/find-tutors") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
          >
            Find tutors
          </Link>
          <div>
            <div className="flex justify-between items-center gap-4">
              {user && (
                <>
                  <Link
                    to="/add-tutorials"
                    className={`${isActive("/add-tutorials") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                  >
                    Add Tutorials
                  </Link>

                  <Link
                    to="/my-tutorials"
                    className={`${isActive("/my-tutorials") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                  >
                    My Tutorials
                  </Link>

                  <Link
                    to="/my-booked-tutors"
                    className={`${isActive("/my-booked-tutors") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                  >
                    My booked tutors
                  </Link>
                  <Link
                    to="/profile"
                    className={`${isActive("/profile") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                  >
                    My Profile
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (

            <div className="flex items-center space-x-2">
              <div>
                <button
                  onClick={toggleTheme}
                  className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>

              </div>
              <div>
                <img
                  src={user.photoURL || "https://www.gravatar.com/avatar/"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  title={user.displayName}
                  onClick={() => navigate("/profile")}
                />
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={toggleTheme}
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-sm"
              >
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>

              <Link
                to="/login"
                className="bg-white text-black p-2 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            </>

          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-blue-600 text-white p-4 z-50 shadow-lg">
            <div className="space-y-4">
              <Link
                to="/"
                className={`${isActive("/") ? "text-yellow-300 font-semibold" : "hover:underline"} block`}
              >
                Home
              </Link>
              <Link
                to="/find-tutors"
                className={`${isActive("/find-tutors") ? "text-yellow-300 font-semibold" : "hover:underline"} block`}
              >
                Find tutors
              </Link>
              {user && (
                <>
                  <div className="space-y-4 flex flex-col">
                    <Link
                      to="/add-tutorials"
                      className={`${isActive("/add-tutorials") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                    >
                      Add Tutorials
                    </Link>

                    <Link
                      to="/my-tutorials"
                      className={`${isActive("/my-tutorials") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                    >
                      My Tutorials
                    </Link>

                    <Link
                      to="/my-booked-tutors"
                      className={`${isActive("/my-booked-tutors") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                    >
                      My booked tutors
                    </Link>
                    <Link
                      to="/profile"
                      className={`${isActive("/profile") ? "text-yellow-300 font-semibold" : "hover:underline"}`}
                    >
                      My Profile
                    </Link>
                  </div>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
