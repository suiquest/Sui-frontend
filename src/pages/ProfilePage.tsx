import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Edit2, Camera, MapPin, Calendar, Award, LogOut, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../components/common/DashboardNavbar';

interface UserProfile {
  name: string;
  role: string;
  profileImage?: string;
  walletAddress?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  totalEarned?: number;
  completedBounties?: number;
  skills?: string[];
}

interface Submission {
  id: number;
  title: string;
  type: string;
  votes: string;
  timeAgo: string;
  submittedDate: Date;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: '',
    skills: [] as string[]
  });

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const selectedSkills = localStorage.getItem('selectedSkills');
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      
      // Get skills from selectedSkills if not in profile
      let userSkills = profile.skills || [];
      if (selectedSkills && userSkills.length === 0) {
        userSkills = JSON.parse(selectedSkills);
      }
      
      setUserProfile({
        ...profile,
        bio: profile.bio || 'No bio added yet',
        location: profile.location || 'Location not set',
        joinDate: profile.joinDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        totalEarned: profile.totalEarned || 0,
        completedBounties: profile.completedBounties || 0,
        skills: userSkills
      });
      setEditForm({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        skills: userSkills
      });
    }

    // Load user submissions from localStorage
    loadUserSubmissions();
  }, []);

  const loadUserSubmissions = () => {
    const userSubmissions = localStorage.getItem('userSubmissions');
    if (userSubmissions) {
      const parsedSubmissions = JSON.parse(userSubmissions);
      setSubmissions(parsedSubmissions);
    }
  };

  const generateActivityData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map(month => {
      const monthSubmissions = submissions.filter(sub => {
        const subDate = new Date(sub.submittedDate);
        return subDate.getMonth() === months.indexOf(month) && subDate.getFullYear() === currentYear;
      });
      
      return {
        month,
        submissions: monthSubmissions.length
      };
    });
  };

  const activityData = generateActivityData();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (userProfile) {
          const updatedProfile = { ...userProfile, profileImage: imageUrl };
          setUserProfile(updatedProfile);
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        ...editForm
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    // Clear all user-related data including wallet
    localStorage.removeItem('userProfile');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('myListings');
    localStorage.removeItem('selectedSkills');
    localStorage.removeItem('userSubmissions');
    localStorage.removeItem('jobListings');
    
    // Clear wallet session data
    localStorage.removeItem('sui-dapp-kit:wallet-connection-info');
    localStorage.removeItem('sui-dapp-kit:last-connected-wallet-name');
    localStorage.removeItem('sui-dapp-kit:auto-connect-enabled');
    
    // Clear any other wallet-related storage
    Object.keys(localStorage).forEach(key => {
      if (key.includes('wallet') || key.includes('sui') || key.includes('dapp-kit')) {
        localStorage.removeItem(key);
      }
    });
    
    // Navigate to home page
    navigate('/');
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const formatWalletAddress = (address: string): string => {
    if (!address) return '';
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardNavbar userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <div className="col-span-3">
            {/* Profile Image */}
            <div className="mb-6">
              <div 
                className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center mx-auto cursor-pointer hover:opacity-80 transition-opacity overflow-hidden relative group"
                onClick={handleImageClick}
              >
                {userProfile.profileImage ? (
                  <img 
                    src={userProfile.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <>
                    <span className="text-white text-6xl font-bold">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </span>
                    {/* Camera overlay - only shows on hover when no image */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200">
                      <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Bio Section */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Bio</h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg resize-none h-20"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="text-gray-300 text-sm space-y-1">
                  <div className="font-medium">{userProfile.name}</div>
                  <div className="text-gray-400">@{userProfile.name.toLowerCase().replace(/\s+/g, '')}</div>
                  <div className="mt-3 text-gray-400">{userProfile.bio}</div>
                  <div className="mt-2 text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {userProfile.location}
                  </div>
                  <div className="mt-2 text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {userProfile.joinDate}
                  </div>
                </div>
              )}
            </div>

            {/* Edit/Save Buttons */}
            {isEditing ? (
              <div className="space-y-2 mb-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg"
                  placeholder="Location"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors mb-6">
              Share
            </button>

            {/* Skills Section */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Skill Set</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills && userProfile.skills.length > 0 ? (
                  userProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">No skills added yet</span>
                )}
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-white font-semibold mb-3">Account</h3>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </div>

          {/* Middle Column - Submissions */}
          <div className="col-span-5">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Submissions</h2>
                <span className="text-gray-400 text-sm">Bounty</span>
              </div>

              {submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border-b border-slate-700/50 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs font-semibold">
                            {submission.id}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium mb-2 leading-tight">
                            {submission.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <span className="uppercase font-medium">{submission.type}</span>
                              <span className="text-green-400 font-medium">{submission.votes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{submission.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium">No submissions yet</p>
                    <p className="text-sm">Start participating in bounties to see your submissions here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Activity */}
          <div className="col-span-4">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Activity</h2>
                <span className="text-gray-400 text-sm">This Year</span>
              </div>

              {/* Activity Legend */}
              <div className="flex items-center gap-4 mb-6 text-xs flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                  <span className="text-gray-400">1-2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-gray-400">3-5</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  <span className="text-gray-400">6+</span>
                </div>
              </div>

              {/* Activity Grid */}
              <div className="space-y-2 overflow-x-auto">
                {activityData.map((month) => (
                  <div key={month.month} className="flex items-center gap-2 min-w-0">
                    <div className="w-6 text-xs text-gray-400 font-medium flex-shrink-0">
                      {month.month}
                    </div>
                    <div className="flex gap-0.5 flex-1">
                      {Array.from({ length: 30 }, (_, weekIndex) => {
                        const hasActivity = month.submissions > 0 && weekIndex % 3 === 0;
                        const activityLevel = hasActivity ? month.submissions : 0;
                        
                        let bgColor = 'bg-slate-700/30';
                        if (activityLevel >= 1 && activityLevel <= 2) bgColor = 'bg-blue-400';
                        if (activityLevel >= 3 && activityLevel <= 5) bgColor = 'bg-blue-500';
                        if (activityLevel >= 6) bgColor = 'bg-blue-600';
                        
                        return (
                          <div
                            key={weekIndex}
                            className={`w-2 h-2 rounded-sm ${bgColor} flex-shrink-0`}
                            title={hasActivity ? `${activityLevel} submissions` : 'No activity'}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {submissions.length === 0 && (
                <div className="text-center mt-6 py-4">
                  <p className="text-gray-400 text-sm">Your activity will appear here once you start submitting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to logout? You'll need to reconnect your wallet and set up your profile again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;






