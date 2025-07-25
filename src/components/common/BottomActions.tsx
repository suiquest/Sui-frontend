// src/components/common/BottomActions.tsx
import React from 'react';

interface BottomActionsProps {
  onBack?: () => void;
  onSkip?: () => void;
  onNext: () => void;
  backLabel?: string;
  skipLabel?: string;
  nextLabel?: string;
  showSkip?: boolean;
  showBack?: boolean;
}

const BottomActions: React.FC<BottomActionsProps> = ({ 
  onBack, 
  onSkip, 
  onNext, 
  backLabel = "Back", 
  skipLabel = "Skip remaining step", 
  nextLabel = "Next to Profile",
  showSkip = true,
  showBack = true
}) => {
  return (
    <div className="flex items-center justify-between bg-[#1d2938] px-2 py-2 rounded-lg border-slate-700">
      {showBack && onBack ? (
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-slate-600 text-gray-300 hover:border-slate-500 hover:text-white transition-colors"
        >
          {backLabel}
        </button>
      ) : (
        <div></div>
      )}

      <div className="flex items-center space-x-4">
        {showSkip && onSkip && (
          <button
            onClick={onSkip}
            className="px-6 py-3 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {skipLabel}
          </button>
        )}
        
        <button
          onClick={onNext}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <span>{nextLabel}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BottomActions;