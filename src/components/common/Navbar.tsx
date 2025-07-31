// sui-quest\src\components\common\Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/Frame 10.svg'
import { ConnectButton } from '@mysten/dapp-kit';

const Navbar: React.FC = () => {

  return (
    <header className="flex items-center justify-between px-42 py-4 bg-[#1d293d] sticky top-0 z-40">
      {/* Logo - Left */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" style={{ width: 50 }} />
        <span className='font-bold text-white'>Sui Quest</span>
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
      <ConnectButton className='bg-[#4099ff]'/>
    </header>
  );
};

export default Navbar;
