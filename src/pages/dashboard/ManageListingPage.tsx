import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import DashboardNavbar from '../../components/common/DashboardNavbar';
import CreateBountyModal from '../../components/modals/CreateBountyModal';
import { useNavigate } from 'react-router-dom';

interface Bounty {
  id: string;
  title: string;
  company: string;
  description: string;
  bounty: number;
  dueDate: string;
  category: string;
  postedTime: string;
  avatar: string;
  status: 'active' | 'completed' | 'expired';
}

const ManageListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [myListings, setMyListings] = useState<Bounty[]>([]);
  const [activeTab, setActiveTab] = useState('My Listing');

  // Get user profile from localStorage
  const getUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return { name: 'User', role: 'User' };
  };

  const userProfile = getUserProfile();

  // Load listings from localStorage on component mount
  useEffect(() => {
    const savedListings = localStorage.getItem('myListings');
    if (savedListings) {
      setMyListings(JSON.parse(savedListings));
    }
  }, []);

  // Save listings to localStorage whenever myListings changes
  useEffect(() => {
    localStorage.setItem('myListings', JSON.stringify(myListings));
  }, [myListings]);

  const handleCreateBounty = (bountyData: any) => {
    const newBounty: Bounty = {
      id: bountyData.id,
      title: bountyData.title,
      company: bountyData.company,
      description: bountyData.description,
      bounty: bountyData.totalPricePool,
      dueDate: new Date(bountyData.dueDate).toLocaleDateString(),
      category: bountyData.category,
      postedTime: bountyData.postedTime,
      avatar: bountyData.avatar,
      status: 'active'
    };

    setMyListings(prev => [newBounty, ...prev]);
    
    // Also update the main job listings in localStorage for dashboard
    const existingJobs = localStorage.getItem('jobListings');
    const jobListings = existingJobs ? JSON.parse(existingJobs) : [];
    const updatedJobs = [newBounty, ...jobListings];
    localStorage.setItem('jobListings', JSON.stringify(updatedJobs));
  };

  const totalSubmissions = myListings.reduce((acc, listing) => acc + Math.floor(Math.random() * 50), 0);
  const totalRewardGiven = myListings.reduce((acc, listing) => acc + listing.bounty, 0);

  const handleListingClick = (listing: Bounty) => {
    navigate('/dashboard/listing-detail', {
      state: { listing }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardNavbar userProfile={userProfile} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-4">
            {/* Create new listing button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create new listing
            </button>

            {/* Navigation */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('My Listing')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'My Listing' 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                📋 My Listing
              </button>
              <button
                onClick={() => setActiveTab('Get Help')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'Get Help' 
                    ? 'bg-slate-700 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                ❓ Get Help
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-1">{totalSubmissions}</div>
                <div className="text-gray-400 text-sm">Total Submission</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-1">{myListings.length}</div>
                <div className="text-gray-400 text-sm">Total Listing</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="text-2xl font-bold text-white mb-1">${totalRewardGiven.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Total Reward Given</div>
              </div>
            </div>

            {/* My Listing Section */}
            <div>
              <h2 className="text-lg font-medium text-white mb-6">My Listing</h2>
              
              {myListings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No listings created yet</div>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Create your first listing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myListings.map((listing) => (
                    <div 
                      key={listing.id} 
                      className="bg-slate-800 rounded-lg p-6 cursor-pointer hover:bg-slate-700 transition-colors"
                      onClick={() => handleListingClick(listing)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {listing.title.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium mb-2">{listing.title}</h3>
                          <p className="text-white text-sm mb-3">{listing.company}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-yellow-400">⭐ Bounty</span>
                            <span className="text-gray-400">Due in {listing.dueDate}</span>
                            <span className="text-gray-400">💰 ${listing.bounty}</span>
                            <span className="text-green-400">● Active</span>
                          </div>
                          <div className="text-gray-400 text-xs mt-2">{listing.postedTime}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Bounty Modal */}
      <CreateBountyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateBounty}
      />
    </div>
  );
};

export default ManageListingPage;
