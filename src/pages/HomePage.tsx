import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, DollarSign, CheckCircle, Clock, } from 'lucide-react';
import Layout from '../components/common/Layout';
import Group1Image from '../assets/Group 1.png';
import ContainerImage from '../assets/Container.png';

const HomePage: React.FC = () => {
  return (
    <Layout 
      navbarProps={{
        authButtonText: "Get Started"
      }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-40 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Contributor fuelling the{' '}
                  <span className="text-blue-400">Sui Ecosystem</span>
                </h1>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                SuiQuest is the single layer where projects post the missions that move 
                the ecosystem, and where builders, designers, and marketers contribute, 
                Less talk moves than wallets. One line. We believe. If you're here to ship, 
                it's written for you. If you're here to earn, it's written for you.
              </p>
              
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
                <span className="text-gray-400 text-sm">
                  It will only take a minute
                </span>
              </div>
            </div>

            {/* Right Content - Activity Feed */}
            <div className=" backdrop-blur-sm rounded-xl p-6  ">
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="flex items-start gap-3 p-4  bg-slate-800/70 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    U
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">User</span>
                      <span className="text-gray-400 text-xs">
                        [SUI Session] Add hack to on homepage
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>5 months ago</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        23 chained
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex items-start gap-3 p-4  bg-slate-800/70 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">Add</span>
                      <span className="text-gray-400 text-xs">
                        Add server-side marketing session ask Solution
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>5 months ago</span>
                      <span className="text-blue-400 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        $19,000
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="flex items-start gap-3 p-4  bg-slate-800/70 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">Sys</span>
                      <span className="text-gray-400 text-xs">
                        Something in Marketing goes
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>1 day ago</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 4 */}
                <div className="flex items-start gap-3 p-4  bg-slate-800/70 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">MktUser</span>
                      <span className="text-gray-400 text-xs">
                        Marketing Platform Builder
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>2 days ago</span>
                      <span className="text-yellow-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>

                {/* Activity Item 5 */}
                <div className="flex items-start gap-3 p-4  bg-slate-800/70 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">DevCon</span>
                      <span className="text-gray-400 text-xs">
                        Development Contract Session
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>3 days ago</span>
                      <span className="text-purple-400">🚀 New</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 1 Image Section - Centered */}
        <div className="container mx-auto px-20 py-16">
          <div className="flex justify-center">
            <img 
              src={Group1Image} 
              alt="Group 1" 
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Container Image Section - Centered */}
        <div className="container mx-auto px-20 py-16">
          <div className="flex justify-center">
            <img 
              src={ContainerImage} 
              alt="Container" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
