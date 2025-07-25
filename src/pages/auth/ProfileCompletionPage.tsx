// src/pages/auth/ProfileCompletionPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressionStatus from '../../components/common/ProgressionStatus';

interface LocationState {
  firstName?: string;
}

const ProfileCompletionPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the firstName from navigation state, fallback to 'User' if not provided
  const state = location.state as LocationState & { userProfile?: any };
  const firstName = state?.firstName || 'User';
  const userProfile = state?.userProfile;

  useEffect(() => {
    // Animate progress bar with multiple stages for more realistic effect
    const timer1 = setTimeout(() => {
      setProgress(25); // First stage
    }, 300);
    
    const timer2 = setTimeout(() => {
      setProgress(50); // Second stage
    }, 800);
    
    const timer3 = setTimeout(() => {
      setProgress(75); // Final stage - about 75% filled as shown in image
    }, 1300);

    // Auto-redirect with user profile data
    const redirectTimer = setTimeout(() => {
      navigate('/dashboard', { state: { userProfile } });
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(redirectTimer);
    };
  }, [navigate, userProfile]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      
      {/* Progress Status at top - Show all steps completed */}
      <div className="relative z-10">
        <ProgressionStatus currentStep={4} showCompletionAnimation={true} />
      </div>
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center max-w-2xl mx-auto px-8">
          {/* Main Heading */}
          <h1 className="text-3xl font-semibold text-white mb-6">
            Head's up <span className="text-white">{firstName}</span>.
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-lg mb-16">
            You are about to enter an ocean full of bounties!
          </p>
        </div>
      </div>

      {/* Bottom Section with Progress */}
      <div className="pb-16 relative z-10">
        <div className="max-w-md mx-auto px-8">
          {/* Sui Quest Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              {/* Sui Quest Icon */}
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="text-white font-medium text-lg">Sui Quest</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out transform"
                style={{ 
                  width: `${progress}%`,
                  transformOrigin: 'left center'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionPage;
