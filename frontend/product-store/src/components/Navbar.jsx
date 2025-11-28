import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { useColorMode } from "./ui/color-mode";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <nav className="w-full bg-green-900 dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 bg-green-600">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Product Store 🛒
          </Link>

          <div className="flex gap-3 items-center">
            <Link
              to="/create"
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              <MdAddBox size={24} />
            </Link>
            <button
              onClick={toggleColorMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition"
            >
              {colorMode === "light" ? (
                <IoMoon size={20} />
              ) : (
                <LuSun size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
