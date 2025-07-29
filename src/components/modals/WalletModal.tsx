import React, { useState } from 'react';
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
  userName = "User",
  walletBalance = "0",
  onWithdraw
}) => {
  if (!isOpen) return null;

  const handleWithdraw = () => {
    if (onWithdraw) {
      onWithdraw();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Wallet - {userName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Total Amount */}
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${totalEarned}
            </div>
            <div className="text-sm text-gray-500">Total Bounty Winnings</div>
          </div>

          {/* Wallet Balance */}
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${walletBalance}
            </div>
            <div className="text-sm text-gray-500">Available Balance</div>
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Withdraw Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;


