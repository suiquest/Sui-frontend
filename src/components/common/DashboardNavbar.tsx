import React from 'react';
import Logo from '/src/assets/Frame 10.svg';

interface UserProfile {
  name?: string;
  role?: string;
  avatar?: string;
}

interface DashboardNavbarProps {
  userProfile?: UserProfile; // Make it optional
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ userProfile }) => {
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
            <img src={Logo} alt="Logo" style={{ width:50 }} />
            <span>Sui Quest</span>
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

        {/* User Profile Section or Connect Wallet Button */}
        {userProfile?.name ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">{userProfile.name.split(' ')[0]}</span>
            {userProfile.role && (
              <span className="text-sm text-gray-300">• {userProfile.role}</span>
            )}
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {userProfile.avatar || getInitial(userProfile.name)}
              </span>
            </div>
          </div>
        ) : (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
