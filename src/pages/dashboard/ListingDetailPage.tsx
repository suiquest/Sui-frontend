import React, { useState, useRef } from 'react';
import { ArrowLeft, Search, Plus, List, HelpCircle, Eye } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  status: 'Review' | 'Under Review';
  payAmount?: string;
}

const BulQuestNavbar = () => (
  <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="text-white font-medium">Bul Quest</span>
        </div>
        <div className="flex items-center gap-6 text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Discover</a>
          <a href="#" className="hover:text-white transition-colors">Search</a>
          <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-300">Bilal S.</span>
        <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
          +4.9 Bounty Days
        </button>
        <span className="text-gray-300">Open Profile</span>
      </div>
    </div>
  </nav>
);

const ListingDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>('/api/placeholder/120/120');
  const [contributors] = useState<Contributor[]>([
    {
      id: '1',
      name: 'Andrew L',
      avatar: '🟠',
      specialty: 'Videojd... - Sprout',
      status: 'Review'
    },
    {
      id: '2',
      name: 'Justin Associate',
      avatar: '👤',
      specialty: 'Videofrd... - Sprout',
      status: 'Review'
    },
    {
      id: '3',
      name: 'Chinnwachuwm Peter Fwuzus',
      avatar: '👤',
      specialty: 'Videofrd... - Sprout',
      status: 'Review'
    },
    {
      id: '4',
      name: 'Prospero Milan',
      avatar: '🟣',
      specialty: 'Videofrd... - Sprout',
      status: 'Review'
    },
    {
      id: '5',
      name: 'Zkreaum ID',
      avatar: '👤',
      specialty: 'Videofrd... - Sprout',
      status: 'Review'
    }
  ]);
  
  const [selectedContributor, setSelectedContributor] = useState<Contributor>(contributors[4]);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <BulQuestNavbar />
      
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-slate-800 min-h-screen p-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2">
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
          <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-1">
              {/* Listing Header */}
              <div className="flex items-start gap-4 mb-8">
                <div 
                  className="w-28 h-28 bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-500 transition-colors flex items-center justify-center overflow-hidden"
                  onClick={handleImageClick}
                >
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Listing" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Plus className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Design 4 Magic Eden Discovery Pages
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>🏆 Bounty</span>
                    <span>🌟 Top winner</span>
                    <span>👁️ 3</span>
                    <span>❤️ 3</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-gray-400 text-sm mb-1">Submission</div>
                  <div className="text-2xl font-bold text-white">15</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-gray-400 text-sm mb-1">Deadline</div>
                  <div className="text-2xl font-bold text-white">12th . Oct 11:59pm</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-gray-400 text-sm mb-1">Prize</div>
                  <div className="text-2xl font-bold text-white">$150</div>
                </div>
              </div>

              {/* Search and Contributors List */}
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for opportunities"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  {contributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      onClick={() => setSelectedContributor(contributor)}
                      className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedContributor.id === contributor.id 
                          ? 'bg-slate-700' 
                          : 'hover:bg-slate-700'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                        {contributor.avatar === '🟠' && '👤'}
                        {contributor.avatar === '🟣' && '👤'}
                        {contributor.avatar === '👤' && '👤'}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{contributor.name}</div>
                        <div className="text-gray-400 text-sm">{contributor.specialty}</div>
                      </div>
                      <span className="bg-orange-400 text-black px-3 py-1 rounded text-sm font-medium">
                        {contributor.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Selected Contributor */}
            <div className="w-80">
              <div className="bg-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{selectedContributor.name}</h3>
                    <p className="text-gray-400 text-sm">View Profile</p>
                    <div className="bg-orange-400 text-black px-2 py-1 rounded text-xs font-medium mt-1 inline-block">
                      Winner
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex-1">
                    Pay $300
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1">
                    Under Review
                    <span className="text-xs">▼</span>
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">URL</label>
                  <div className="bg-slate-700 rounded-lg p-3">
                    <textarea
                      className="w-full bg-transparent text-white text-sm resize-none focus:outline-none"
                      rows={4}
                      defaultValue="https://docs.google.com/document/d/1qzYQuwm8ZLNqzJiN5xgwxXEorPY-OjVYlYk4edrh8to=1Dfhasdlng-h_smasB4hlhY"
                      readOnly
                    />
                  </div>
                </div>

                <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Submission
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;