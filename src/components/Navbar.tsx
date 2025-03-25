
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLolStore } from '../store/lolStore';

const Navbar = () => {
  const location = useLocation();
  const { summoner } = useLolStore();

  return (
    <nav className="lol-glass bg-slate-900/50  rounded-full sticky h-16 z-50 px-6 flex items-center justify-between m-4">
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-beaufort text-2xl text-lol-white font-bold tracking-wider">
          LoL Mastery Hub
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {summoner && (
          <>
            <Link
              to="/profile"
              className={`font-beaufort text-sm uppercase tracking-wider transition-colors duration-300 ${location.pathname === '/profile'
                  ? 'text-lol-gold border-b-2 border-lol-gold'
                  : 'text-lol-light hover:text-lol-blue'
                }`}
            >
              Profile
            </Link>
            <Link
              to="/champions"
              className={`font-beaufort text-sm uppercase tracking-wider transition-colors duration-300 ${location.pathname === '/champions'
                  ? 'text-lol-gold border-b-2 border-lol-gold'
                  : 'text-lol-light hover:text-lol-blue'
                }`}
            >
              Champions
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
