import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 w-full bg-gray-200 shadow-sm">
      <h1 className="text-gray-700 font-bold">LilyCanCook<b>Better</b></h1>
      <ul className="flex list-none p-0 m-0">
        <li className="mx-8 group">
          <Link
            to="/recipes"
            className="text-gray-700 font-bold no-underline pb-1 relative block transition-colors duration-300 hover:text-gray-500"
          >
            Recipes
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-700 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>
        {/* Add more list items as needed */}
      </ul>
    </nav>
  );
}

export default NavBar;
