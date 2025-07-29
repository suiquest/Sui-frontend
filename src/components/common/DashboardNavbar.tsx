import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/src/assets/Frame 10.svg';

interface UserProfile {
  name?: string;
  role?: string;
  avatar?: string;
  walletAddress?: string;
}

interface DashboardNavbarProps {
  userProfile?: UserProfile;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  // Get wallet address from localStorage if not in userProfile
  const walletAddress = userProfile?.walletAddress || localStorage.getItem('walletAddress');
  
  // Format wallet address for display (show first 6 and last 4 characters)
  const formatWalletAddress = (address: string): string => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Extract first letter of name for avatar if no custom avatar provided
  const getInitial = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="border-slate-700 sticky top-0 z-50 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" style={{ width: 50 }} />
        </div>
        
        {/* Navigation Links - Center */}
        <nav className="flex items-center gap-6 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Search
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Leaderboard
          </a>
        </nav>

        {/* User Profile Section - Right */}
        <div className="flex items-center gap-3">
          {userProfile?.name && (
            <span className="text-sm text-gray-300">{userProfile.name.split(' ')[0]}</span>
          )}
          {walletAddress && (
            <span className="text-sm text-gray-400">• {formatWalletAddress(walletAddress)}</span>
          )}
          <div 
            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
            onClick={handleProfileClick}
          >
            <span className="text-white text-sm font-semibold">
              {userProfile?.avatar || (userProfile?.name ? getInitial(userProfile.name) : 'U')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
