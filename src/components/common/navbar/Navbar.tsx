import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, PawPrint, User, ShoppingCart, Heart } from "lucide-react";
import { NavItem } from "../../../types";
import { fadeIn } from "../../../utils/animations";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              PetCare.AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-5 h-5 mr-2" />
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/wishlist"
                className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-5 h-5 mr-2" />
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5 mr-2" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
