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
  
  // Get profile image from localStorage
  const getProfileImage = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return profile.profileImage;
    }
    return null;
  };

  const profileImage = getProfileImage();
  
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
    console.log('Profile clicked - navigating to /profile');
    navigate('/profile');
  };

  return (
    <header className="border-slate-700 sticky top-0 z-50 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" style={{ width: 50 }} />
          <span className='text-white'>Sui Quest</span>
        </div>
        
        {/* Centered Navigation Links */}
        <nav className="flex items-center gap-6 text-sm text-gray-300">
          <a href="/dashboard" className="hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Search
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Leaderboard
          </a>
        </nav>

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          {userProfile?.name && (
            <span className="text-sm text-gray-300">{userProfile.name.split(' ')[0]}</span>
          )}
          {walletAddress && (
            <span className="text-sm text-gray-400">• {formatWalletAddress(walletAddress)}</span>
          )}
          <button 
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {userProfile?.avatar || (userProfile?.name ? getInitial(userProfile.name) : 'U')}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
