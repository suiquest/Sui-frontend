// sui-quest\src\components\common\Navbar.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '/src/assets/Frame 10.svg'

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
        <img src={Logo} alt="Logo" style={{ width: 50 }} />
        
      </Link>
      
      {/* Navigation - Center */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link 
          to="/dashboard" 
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
