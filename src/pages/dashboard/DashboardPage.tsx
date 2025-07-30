import React, { useState, useEffect } from 'react';
import { Search, Filter} from 'lucide-react';
import DashboardNavbar from '../../components/common/DashboardNavbar';
import CreateBountyModal from '../../components/modals/CreateBountyModal';
import WalletModal from '../../components/modals/WalletModal';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Usdc from '../../assets/USDC.png'

interface JobListing {
  id: string;
  title: string;
  company: string;
  description: string;
  bounty: number;
  dueDate: string;
  category: string;
  postedTime: string;
  avatar: string;
}

interface RecentActivity {
  id: string;
  name: string;
  description: string;
  amount: string;
  currency: string;
  avatar: string;
}

interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

interface ProfileData {
  name: string;
  role: string;
  totalEarned: string;
  opportunitiesListed: number;
}

// interface DashboardPageProps {
//   userProfile: UserProfile;
// }

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user profile from localStorage or location state
  const getUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return location.state?.userProfile || { name: 'User', role: 'User' };
  };

  const userProfile = getUserProfile();

  // Check if user has completed profile setup
  useEffect(() => {
    if (!userProfile.walletAddress || !userProfile.name) {
      // Redirect to wallet connection if profile is incomplete
      navigate('/');
    }
  }, [userProfile, navigate]);

  // Create profile data from userProfile
  const [profile] = useState<ProfileData>({
    name: userProfile.name,
    role: userProfile.role,
    totalEarned: '25,000 USD',
    opportunitiesListed: 10
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Make jobListings state so we can add new bounties
  const [jobListings, setJobListings] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Discovery Story',
      company: 'Magic Eden',
      description: 'Looking for a skilled figma designer to design 4 pages good things is we have reference and all thought process is already figured Out! we only need someone who is very good with pixelation components design and poping colours we could use AI',
      bounty: 148,
      dueDate: 'Due in 1h',
      category: 'Content',
      postedTime: 'Posted 30 minutes ago',
      avatar: '💰'
    },
    {
      id: '2',
      title: 'Share Your Magic Eden Discovery Story',
      company: 'Magic Eden',
      description: 'Looking for a skilled figma designer to design 4 pages good things is we have reference and all thought process is already figured Out! we only need someone who is very good with pixelation components design and poping colours we could use AI',
      bounty: 148,
      dueDate: 'Due in 1h',
      category: 'Content',
      postedTime: 'Posted 30 minutes ago',
      avatar: '💰'
    },
    {
      id: '3',
      title: 'Share Your Magic Eden Discovery Story',
      company: 'Magic Eden',
      description: 'Looking for a skilled figma designer to design 4 pages good things is we have reference and all thought process is already figured Out! we only need someone who is very good with pixelation components design and poping colours we could use AI',
      bounty: 148,
      dueDate: 'Due in 1h',
      category: 'Content',
      postedTime: 'Posted 30 minutes ago',
      avatar: '💰'
    }
  ]);

  const filters = ['All', 'Content', 'Design', 'Development', 'Other'];

  // Recent activity data
  const recentActivity: RecentActivity[] = [
    { id: '1', name: 'Edward On', description: 'Canada Prize Track by MCA (Multiple...', amount: '1.5k', currency: 'USDC', avatar: '🟣' },
    { id: '2', name: 'Andrew L.', description: 'Canada Prize Track by MCA (Multiple...', amount: '3k', currency: 'USDC', avatar: '🟠' },
    { id: '3', name: 'Justin Absolute', description: 'Canada Prize Track by MCA (Multiple...', amount: '1k', currency: 'USDC', avatar: '🔵' },
    { id: '4', name: 'Chinesecherem Peter Ewuzie', description: 'Community Manager for Stealth Ga...', amount: '400', currency: 'USDC', avatar: '🟤' },
    { id: '5', name: 'Prospero Milan', description: 'Tokenizing Web2 Marketplaces in SEA', amount: '300', currency: 'USDC', avatar: '🟣' },
    { id: '6', name: 'Zhreum ID', description: 'Tokenizing Web2 Marketplaces in SEA', amount: '1k', currency: 'USDC', avatar: '⚫' }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || job.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleBountyClick = (bountyId: string) => {
    navigate(`/dashboard/bounty/${bountyId}`, {
      state: {
        bounty: jobListings.find(job => job.id === bountyId)
      }
    });
  };

  // Load job listings from localStorage on component mount and merge with created bounties
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobListings');
    const myListings = localStorage.getItem('myListings');
    
    let allJobs = [];
    
    // Load existing job listings
    if (savedJobs) {
      allJobs = JSON.parse(savedJobs);
    }
    
    // Merge with user's created listings
    if (myListings) {
      const userListings = JSON.parse(myListings);
      // Add user listings that aren't already in the main list
      userListings.forEach((listing: JobListing) => {
        if (!allJobs.find((job: JobListing) => job.id === listing.id)) {
          allJobs.unshift(listing); // Add to beginning
        }
      });
    }
    
    setJobListings(allJobs);
  }, []);

  // Save job listings to localStorage whenever jobListings changes
  useEffect(() => {
    localStorage.setItem('jobListings', JSON.stringify(jobListings));
  }, [jobListings]);

  const handleCreateBounty = (bountyData: any) => {
    console.log('Creating bounty:', bountyData);
    
    const newBounty: JobListing = {
      id: bountyData.id,
      title: bountyData.title,
      company: bountyData.company,
      description: bountyData.description,
      bounty: bountyData.totalPricePool,
      dueDate: new Date(bountyData.dueDate).toLocaleDateString(),
      category: bountyData.category,
      postedTime: bountyData.postedTime,
      avatar: bountyData.avatar
    };

    // Update main job listings
    setJobListings(prev => [newBounty, ...prev]);
    
    // Also update myListings in localStorage
    const existingMyListings = localStorage.getItem('myListings');
    const myListings = existingMyListings ? JSON.parse(existingMyListings) : [];
    const updatedMyListings = [newBounty, ...myListings];
    localStorage.setItem('myListings', JSON.stringify(updatedMyListings));
  };

  const handleManageListingClick = () => {
    navigate('/dashboard/manage-listing');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <DashboardNavbar userProfile={userProfile} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter - Single container with bottom border */}
            <div className="border-b border-slate-600 focus-within:border-blue-500 transition-colors duration-200">
              <div className="flex">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for opportunities"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white">
                  Filter
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm border border-gray-600 transition-colors ${
                    activeFilter === filter
                      ? 'bg-gray-700 text-white border-gray-500'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Trending Today Section */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Trending today</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                    onClick={() => handleBountyClick(i.toString())}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-pink-600 flex items-center justify-center text-lg">
                        ME
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">Share Your Magic Eden Discovery Story</h3>
                        <p className="text-white text-sm mb-2">Magic Eden</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>Bounty</span>
                          <div className="w-px h-4 bg-gray-600"></div>
                          <span>Due in 1h</span>
                          <div className="w-px h-4 bg-gray-600"></div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discover Bounties Section */}
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Discover Bounties</h2>
              <p className="text-gray-400 text-sm mb-6">Posted 30 minutes ago</p>
              
               <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="p-6 cursor-pointer hover:bg-slate-700 transition-colors"
                        onClick={() => handleBountyClick(job.id)}
                      >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
                        ORG
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-2">{job.title}</h3>
                        <p className="text-white text-sm mb-3">{job.company}</p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {job.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Bounty</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <span>{job.dueDate}</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <span>${job.bounty}</span>
                            <div className="w-px h-4 bg-gray-600"></div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 pt-25">
            {/* Manage listing Card */}
            <div 
              className="bg-blue-500 rounded-lg py-2 px-4 cursor-pointer hover:bg-blue-600 transition-all"
              onClick={handleManageListingClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">Manage listing</span>
                  
                </div>
                <div className="text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-3">
              {/* Total Bounty Token */}
              <div 
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                       <img src={Usdc} alt="usdc" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">0</div>
                      <div className="text-gray-400 text-sm">Total Bounty Token</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 bg-[#101828] px-4 py-2 rounded-lg
">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <span className="text-sm">Credit</span>
                  </div>
                </div>
              </div>

              {/* Total Earning */}
              <div 
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                       <img src={Usdc} alt="usdc" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">0 USD</div>
                      <div className="text-gray-400 text-sm">Total Earning</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 bg-[#101828] px-4 py-2 rounded-lg ">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Withdraw</span>
                  </div>
                </div>
              </div>

              {/* On-going Bounties */}
              <div 
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-700 transition-colors"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10  flex items-center justify-center">
                      <img src={Usdc} alt="usdc" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">10</div>
                      <div className="text-gray-400 text-sm">On-going Bounties</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 bg-[#101828] px-4 py-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">Manage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bounty Payouts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-white">RECENT BOUNTY PAYOUTS</h3>
                <button className="text-blue-400 text-sm hover:text-blue-300">
                  Leaderboard →
                </button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {activity.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {activity.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                    <img src={Usdc} alt='usdc' />
                      <span className="text-blue-400">{activity.amount}</span>
                      <span className="text-gray-400">{activity.currency}</span>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        totalEarned={profile.totalEarned}
      />
    </div>
  );
};

export default DashboardPage;
