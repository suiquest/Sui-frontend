import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/src/assets/logo.png'
import { ConnectButton } from "@mysten/dapp-kit";

interface SuiQuestLoginProps {
  onSignIn: () => void;
}



const SuiQuestLogin: React.FC<SuiQuestLoginProps> = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Navigate to role selection after "authentication"
    navigate('/role-selection');
  };

  // const handleEmailSignIn = () => {
  //   // Navigate to role selection after "authentication"
  //   navigate('/role-selection');
  // };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-42 py-4">
        {/* Logo - Left */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" style={{ width: 50 }} />
          <span>Sui Quest</span>
        </div>
        
        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href='/dashboard' className="text-gray-300 hover:text-white transition-colors">
            Discover
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Search
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            Leaderboard
          </a>
        </nav>

        <ConnectButton />
        {/* <button 
        onClick={handleGoogleSignIn}
        className="bg-[#4099ff] hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Connect with wallet
        </button> */}
>>>>>>> f221365e94c82676e0a6d727e514ac83125de4f7

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">You are one step away</h1>
            <p className="text-gray-400 text-lg">from joining Sui Quest</p>
          </div>

          <div className="space-y-4">
            {/* Primary Google Sign-in Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-[#4099ff] hover:bg-[#4099ff] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Connect with wallet</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuiQuestLogin;
