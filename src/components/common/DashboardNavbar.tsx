import React from 'react';
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

  return (
    <header className="border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" style={{ width: 50 }} />
          </div>
          
          {/* Navigation Links */}
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
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          {userProfile?.name && (
            <span className="text-sm text-gray-300">{userProfile.name.split(' ')[0]}</span>
          )}
          {userProfile?.role && (
            <span className="text-sm text-gray-300">• {userProfile.role}</span>
          )}
          {walletAddress && (
            <span className="text-sm text-gray-400">• {formatWalletAddress(walletAddress)}</span>
          )}
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
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
