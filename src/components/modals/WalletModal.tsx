import React from 'react';
import { X, ArrowRight } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalEarned: string;
  userName?: string;
  walletBalance?: string;
  onWithdraw?: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ 
  isOpen, 
  onClose, 
  totalEarned, 
  userName,
  walletBalance = "0",
  onWithdraw
}) => {
  if (!isOpen) return null;

  // Get user profile and wallet address from localStorage
  const getUserData = () => {
    const savedProfile = localStorage.getItem('userProfile');
    const walletAddress = localStorage.getItem('walletAddress');
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return {
        name: profile.name || userName || "User",
        walletAddress: profile.walletAddress || walletAddress
      };
    }
    return {
      name: userName || "User",
      walletAddress
    };
  };

  const userData = getUserData();

  const handleWithdraw = () => {
    if (onWithdraw) {
      onWithdraw();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="bg-white rounded-lg w-80 h-fit mt-16 mr-6 shadow-xl">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">{userData.name}'s Wallet</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Ninja</span>
              <span className="text-sm text-gray-400">Help</span>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">We can't wait to see what you've created!</p>
          <p className="text-xs text-gray-500">Note: You can edit this submission until the bounty deadline.</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* Total Bounty Winnings */}
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-1">
              ${totalEarned} USD
            </div>
            <div className="text-sm font-medium text-gray-700">Total Bounty Winnings</div>
          </div>

          {/* Amount Input */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Amount</div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-gray-400">$ {walletBalance}</span>
            </div>
          </div>

          {/* Send to */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Send to</div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <span className="text-gray-400 font-mono text-sm">
                {userData.walletAddress ||  '' }
              </span>
            </div>
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Withdraw</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;


