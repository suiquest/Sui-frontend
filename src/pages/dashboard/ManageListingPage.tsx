import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, List, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/common/DashboardNavbar';

interface Bounty {
  id: string;
  title: string;
  description: string;
  category: string;
  bounty: number;
  dueDate: string;
  status: 'active' | 'completed' | 'expired';
  avatar: string;
  company: string;
  postedTime: string;
}

const ManageListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [myListings, setMyListings] = useState<Bounty[]>([]);

  // Get user profile from localStorage
  const getUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return { name: 'User', role: 'User' };
  };

  const userProfile = getUserProfile();

  // Load user's listings from localStorage
  useEffect(() => {
    const savedListings = localStorage.getItem('myListings');
    if (savedListings) {
      setMyListings(JSON.parse(savedListings));
    }
  }, []);

  // Calculate stats
  const totalSubmissions = myListings.reduce((acc, listing) => acc + (listing.status === 'completed' ? 1 : 0), 0);
  const totalRewardGiven = myListings.reduce((acc, listing) => acc + (listing.status === 'completed' ? listing.bounty : 0), 0);

  const handleCreateNewListing = () => {
    navigate('/dashboard/create-bounty');
  };

  const handleListingClick = (listing: Bounty) => {
    navigate('/dashboard/listing-detail', { state: { listing } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardNavbar userProfile={userProfile} />
      
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 min-h-screen p-4">
          <button 
            onClick={handleCreateNewListing}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2"
          >
            Create new listing
            <Plus className="w-4 h-4" />
          </button>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
              <List className="w-4 h-4 text-gray-400" />
              <span className="text-white">My Listing</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg cursor-pointer">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">Get Help</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-white">Manage Listings</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-white mb-1">{totalSubmissions}</div>
              <div className="text-gray-400 text-sm">Total Submissions</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-white mb-1">{myListings.length}</div>
              <div className="text-gray-400 text-sm">Total Listings</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-white mb-1">${totalRewardGiven.toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Total Reward Given</div>
            </div>
          </div>

          {/* My Listings Section */}
          <div>
            <h2 className="text-lg font-medium text-white mb-6">My Listings</h2>
            
            {myListings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No listings created yet</div>
                <button
                  onClick={handleCreateNewListing}
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
                        {listing.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-2">{listing.title}</h3>
                        <p className="text-gray-300 text-sm mb-3">{listing.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="capitalize">{listing.category}</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <span>Due: {listing.dueDate}</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              listing.status === 'active' ? 'bg-green-600 text-white' :
                              listing.status === 'completed' ? 'bg-blue-600 text-white' :
                              'bg-red-600 text-white'
                            }`}>
                              {listing.status}
                            </span>
                          </div>
                          <div className="text-blue-400 font-medium">
                            ${listing.bounty}
                          </div>
                        </div>
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
  );
};

export default ManageListingPage;

