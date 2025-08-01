// sui-quest\src\components\common\Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Frame 10.svg';
import { ConnectButton } from '@mysten/dapp-kit';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  showAuthButton?: boolean;
  authButtonText?: string;
  authButtonAction?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  showAuthButton = true,
  authButtonText,
  authButtonAction 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 bg-[#1d293d] sticky top-0 z-50">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <span className='font-bold text-white text-sm sm:text-base md:text-lg'>Sui Quest</span>
        </Link>
        
        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link 
            to="/dashboard" 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            Discover
          </Link>
          <Link 
            to="/search" 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            Search
          </Link>
          <Link 
            to="/leaderboard" 
            className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base"
          >
            Leaderboard
          </Link>
        </nav>

        {/* Right Side - Auth Button + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Auth Button - Desktop */}
          {showAuthButton && (
            <div className="hidden sm:block">
              {authButtonAction ? (
                <button 
                  onClick={authButtonAction}
                  className='bg-[#4099ff] px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-md text-white hover:bg-blue-600 transition-colors text-xs sm:text-sm md:text-base font-medium'
                >
                  {authButtonText || 'Connect Wallet'}
                </button>
              ) : (
                <ConnectButton className='bg-[#4099ff] text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-2.5'/>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 " onClick={toggleMobileMenu}>
          <div 
            className="absolute top-0 right-0 w-64 sm:w-72 h-full bg-[#1d293d] shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-600">
              <span className="text-white font-bold text-lg">Menu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col p-4 space-y-4">
              <Link 
                to="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-slate-700 text-base"
                onClick={toggleMobileMenu}
              >
                Discover
              </Link>
              <Link 
                to="/search" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-slate-700 text-base"
                onClick={toggleMobileMenu}
              >
                Search
              </Link>
              <Link 
                to="/leaderboard" 
                className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-slate-700 text-base"
                onClick={toggleMobileMenu}
              >
                Leaderboard
              </Link>
            </nav>

            {/* Mobile Auth Button */}
            {showAuthButton && (
              <div className="p-4 border-t border-slate-600">
                {authButtonAction ? (
                  <button 
                    onClick={() => {
                      authButtonAction();
                      toggleMobileMenu();
                    }}
                    className='w-full bg-[#4099ff] px-4 py-3 rounded-md text-white hover:bg-blue-600 transition-colors text-base font-medium'
                  >
                    {authButtonText || 'Connect Wallet'}
                  </button>
                ) : (
                  <div onClick={toggleMobileMenu}>
                    <ConnectButton className='w-full bg-[#4099ff] text-base px-4 py-3'/>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
