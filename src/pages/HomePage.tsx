import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Github, Paperclip } from "lucide-react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Layout from '../components/common/Layout';
import Group1Image from '../assets/Group 1.png';
import ContainerImage from '../assets/Container.png';
import Eliot from '../assets/Eliot00.png';
import Charislam from '../assets/charislam.png';
import Svg from '../assets/SVG.png';
import Users from '../assets/users.png';
import Dollar from '../assets/dollar.png'

const HomePage: React.FC = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (account?.address) {
      navigate('/profile-setup');
    }
  };

  return (
    <Layout 
      navbarProps={{
        authButtonText: "Get Started"
      }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-[#1d293d]">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  Contributor fuelling the{' '}
                  <span className="text-blue-400">Sui Ecosystem</span>
                </h1>
              </div>
              
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                SuiQuest is the single layer where projects post the missions that move 
                the ecosystem, and where builders, designers, and marketers contribute, 
                Less talk moves than wallets. One line. We believe. If you're here to ship, 
                it's written for you. If you're here to earn, it's written for you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                {account?.address ? (
                  <button
                    onClick={handleGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-lg transition-colors w-full sm:w-auto text-center text-sm sm:text-base"
                  >
                    Get Started
                  </button>
                ) : (
                  <ConnectButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base">
                    Connect Wallet
                  </ConnectButton>
                )}
                <span className="text-gray-400 text-xs sm:text-sm md:text-base">
                  It will only take a minute
                </span>
              </div>
            </div>

            {/* Right Content - Activity Feed */}
            <div className="p-3 sm:p-4 md:p-6 order-1 lg:order-2">
              <div className="max-w-sm sm:max-w-md mx-auto space-y-2 sm:space-y-3">
                
                {/* Activity Item 1 */}
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-800/90 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-1 border border-[#0E6DF13] rounded-lg px-1.5 sm:px-2 bg-[#0E6DF11A] flex-shrink-0">
                    <img src={Svg} alt="svg" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" />
                    <span className="text-xs sm:text-sm">#3</span>
                  </div>
                
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="text-white font-medium text-xs sm:text-sm block truncate">
                        [SSR Guides] Add Nuxt.js to examples
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Github</span>
                        <span className="sm:hidden">GH</span>
                      </div>
                      <span>+3</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden md:inline">4 months ago</span>
                        <span className="md:hidden">4mo</span>
                      </div>
                      <div className="flex items-center gap-1 min-w-0">
                        <img src={Charislam} alt="charislam" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" />
                        <span className="truncate text-xs">charislam</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-800/90 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-1 border border-[#0E6DF13] rounded-lg px-1.5 sm:px-2 bg-[#0E6DF11A] flex-shrink-0">
                    <img src={Svg} alt="svg" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" />
                    <span className="text-xs sm:text-sm">#2</span>
                  </div>
                       
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="text-white font-medium text-xs sm:text-sm block truncate">
                        Add server-side rendering example with SolidStart
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Paperclip className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Attachment</span>
                        <span className="sm:hidden">File</span>
                      </div>
                      <span>+2</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden md:inline">8 months ago</span>
                        <span className="md:hidden">8mo</span>
                      </div>
                      <div className="flex items-center gap-1 min-w-0">
                        <img src={Eliot} alt="Eliot00" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" />
                        <span className="truncate text-xs">Eliot00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Item 3 - Slightly faded */}
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-800/60 rounded-lg border border-slate-700/30 opacity-75">
                  <div className="flex items-center gap-1 border border-[#0E6DF13] rounded-lg px-1.5 sm:px-2 bg-[#0E6DF11A] flex-shrink-0">
                    <img src={Svg} alt="svg" className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" />
                    <span className="text-xs sm:text-sm">#4</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span className="text-white font-medium text-xs sm:text-sm block truncate">
                        Update documentation
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Github</span>
                        <span className="sm:hidden">GH</span>
                      </div>
                      <span>+1</span>
                      <span className="hidden md:inline">1 year ago</span>
                      <span className="md:hidden">1y</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Group 1 Image Section with Overlay Text */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6">
          <div className="flex justify-center relative">
            <div className="relative w-full max-w-6xl">
              <img
                src={Group1Image}
                alt="Group 1"
                className="w-full h-auto"
              />
              
              {/* Responsive Text Overlay */}
              <div className="absolute inset-0 flex items-end justify-center pb-4 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
                <div className="bg-[#FFFFFF0F] border border-[#F3F3F375] bg-opacity-60 rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 lg:py-8 mx-2 sm:mx-4 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl text-center">
                  <h2 className="text-white text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold leading-tight">
                    The #1 verifiable way, contributors earn on Sui.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Container Image Section */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-4 sm:py-6 md:py-10">
          <div className="flex justify-center">
            <img 
              src={ContainerImage} 
              alt="Container" 
              className="w-full max-w-6xl h-auto"
            />
          </div>
        </div>

        {/* Why Contribute Section */}
        <div className="text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
                Why contribute through Sui Quest?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl">
                Data shared with Sui Quest stays on the blockchain.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
              
              {/* Funders Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center group hover:bg-[#FFFFFF15] transition-colors">
                <div className="bg-slate-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-slate-600 transition-colors">
                  <img
                    src={Dollar}
                    alt="dollar"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Funders</h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  Invest in Brilliance. Power the Next Sui Revolution. 
                  Builders Need Vision. Funders Make It Real. Join the 
                  Quest Where Code Meets Capital: The Sui 
                  Ecosystem Quest
                </p>
              </div>

              {/* Developers Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center group hover:bg-[#FFFFFF15] transition-colors">
                <div className="bg-slate-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-slate-600 transition-colors">
                  <img
                    src={Users}
                    alt="Users"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Developers</h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  Code. Create. Conquer — The Sui Dev Quest 🚀
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline"><br /></span>
                  Sui Creators Quest: Where Code Becomes Magic. ✨
                  <br className="hidden sm:block" />
                  Move with Purpose: A Quest for Sui Builders ⚡
                </p>
              </div>

              {/* Creatives Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center group hover:bg-[#FFFFFF15] transition-colors sm:col-span-2 lg:col-span-1">
                <div className="bg-slate-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-slate-600 transition-colors">
                  <img
                    src={Users}
                    alt="Users"
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Creatives</h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  "Calling All Creators: The Sui Ecosystem Needs Your 
                  Voice 🎤 "Stories Shape Chains — What Will You 
                  Create on Sui? ✨ "Creativity Meets Crypto — Start 
                  Your Creator Journey on Sui 💡
                </p>
              </div>
            </div>

            {/* Get Started CTA Section */}
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">🔒 Get Started</h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Our business model is sponsorship. Big brands that want your attention give us
              </p>
            </div>

            {/* Final CTA Button */}
            <div className="text-center">
              <button 
                onClick={handleGetStarted}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base md:text-lg"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
