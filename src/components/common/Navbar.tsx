// sui-quest\src\components\common\Navbar.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  showAuthButton?: boolean;
  authButtonText?: string;
  authButtonAction?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  showAuthButton = true, 
  authButtonText = "Get Started",
  authButtonAction
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthClick = () => {
    if (authButtonAction) {
      authButtonAction();
    } else {
      // Default behavior based on current page
      if (location.pathname === '/dashboard') {
        navigate('/login');
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <header className="flex items-center justify-between px-42 py-4 bg-slate-900">
      {/* Logo - Left */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-xl font-semibold text-white">Sui Quest</span>
      </Link>
      
      {/* Navigation - Center */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link 
          to="/discover" 
          className="text-gray-300 hover:text-white transition-colors"
        >
          Discover
        </Link>
        <Link 
          to="/search" 
          className="text-gray-300 hover:text-white transition-colors"
        >
          Search
        </Link>
        <Link 
          to="/leaderboard" 
          className="text-gray-300 hover:text-white transition-colors"
        >
          Leaderboard
        </Link>
      </nav>

      {/* Auth Button - Right */}
      {showAuthButton && (
        <button
          onClick={handleAuthClick}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === '/dashboard'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-[#4099ff] hover:bg-[#4099ff]'
          }`}
        >
          {authButtonText}
        </button>
      )}
    </header>
  );
};

export default Navbar;