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
      // If wallet is connected, navigate to login
      navigate('/profile-setup');

    }
    // If wallet is not connected, ConnectButton will handle the connection
  };

  return (
    <Layout 
      navbarProps={{
        authButtonText: "Get Started"
      }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-[#1d293d]">
        <div className="container mx-auto px-40 py-10">
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
                {account?.address ? (
                  <button
                    onClick={handleGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                  >
                    Get Started
                  </button>
                ) : (
                  <ConnectButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                    Connect Wallet
                  </ConnectButton>
                )}
                <span className="text-gray-400 text-sm">
                  It will only take a minute
                </span>
              </div>
            </div>

            {/* Right Content - Activity Feed */}
            <div className=" p-6">
              <div className="max-w-md mx-auto space-y-3">
                {/* Item 1 - SSR Guides */}
                    <div className="flex items-center gap-3 p-4 bg-slate-800/90 rounded-lg border border-slate-700/50">
                      
                        <div className="flex items-center gap-1 border- border-[#0E6DF13] rounded-lg px-2 bg-[#0E6DF11A]">
                            <img src={Svg} alt="svg"  
                               className="w-4 h-4 rounded-full" />
                          <span>#3</span>
                        </div>
                       
                    
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">[SSR Guides] Add Nuxt.js to examples</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Github className="w-3 h-3" />
                            <span>Github</span>
                          </div>
                          <span>+3</span>
                          <div className="flex items-center gap-1">
                           <Clock className="w-3 h-3" />
                          <span>4 months ago</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={Charislam} alt="charislam"  
                               className="w-4 h-4 rounded-full" />
                            <span>charislam</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 - Server-side rendering */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/90 rounded-lg border border-slate-700/50">
                   <div className="flex items-center gap-1 border- border-[#0E6DF13] rounded-lg px-2 bg-[#0E6DF11A]">
                            <img src={Svg} alt="svg"  
                               className="w-4 h-4 rounded-full" />
                          <span>#3</span>
                        </div>
                       
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">Add server-side rendering example with SolidStart</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          <span>Attachment</span>
                        </div>
                        <span>+2</span>
                        <div className="flex items-center gap-1">
                           <Clock className="w-3 h-3" />
                          <span>8 months ago</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={Eliot} alt="Eliot00"  
                               className="w-4 h-4 rounded-full" />
                            <span>Eliot00</span>
                          </div>
                      </div>
                    </div>
                  </div>

                    {/* Item 3 - Blurred/Faded */}
                  <div className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-lg border border-slate-700/30 opacity-60 blur-[0.5px]">
                  <div className="flex items-center gap-1 border- border-[#0E6DF13] rounded-lg px-2 bg-[#0E6DF11A]">
                            <img src={Svg} alt="svg"  
                               className="w-4 h-4 rounded-full" />
                          <span>#4</span>
                        </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">Update documentation</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Github className="w-3 h-3" />
                        <span>Github</span>
                      </div>
                      <span>+1</span>
                      <span>1 year ago</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span>contributor</span>
                      </div>
                    </div>
                  </div>
                  </div>

                    {/* Item 4 - More blurred */}
                    <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/20 opacity-40 blur-[1px]">
                      <div className="flex items-center gap-1 border- border-[#0E6DF13] rounded-lg px-2 bg-[#0E6DF11A]">
                            <img src={Svg} alt="svg"  
                               className="w-4 h-4 rounded-full" />
                          <span>#5</span>
                        </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">Fix build issues</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completed</span>
                          </div>
                          <span>2 years ago</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                            <span>maintainer</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Item 5 - Most blurred */}
                <div className="flex items-center gap-3 p-4 bg-slate-800/20 rounded-lg border border-slate-700/10 opacity-25 blur-[1.5px]">
                  <div className="flex items-center gap-1 border- border-[#0E6DF13] rounded-lg px-2 bg-[#0E6DF11A]">
                            <img src={Svg} alt="svg"  
                               className="w-4 h-4 rounded-full" />
                          <span>#6</span>
                        </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">Initial commit</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Github className="w-3 h-3" />
                        <span>Github</span>
                      </div>
                      <span>3 years ago</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span>creator</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
          

        <div className="container mx-auto px-20 py-6">
      <div className="flex justify-center relative">
        <img
          src={Group1Image}
          alt="Group 1"
          className="max-w-full h-auto"
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-45">
          <div className="bg-[#FFFFFF0F] border border-[#F3F3F375] bg-opacity-60 rounded-2xl px-12 py-8 mx-4 max-w-2xl text-center">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The #1 verifiable way, contributors earn on Sui.
            </h2>
          </div>
        </div>
      </div>
    </div>

        {/* Container Image Section - Centered */}
        <div className="container mx-auto px-20 py-10">
          <div className="flex justify-center">
            <img 
              src={ContainerImage} 
              alt="Container" 
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Sui Quest Section */}
        <div className=" text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why contribute through Sui Quest?
              </h2>
              <p className="text-gray-300 text-lg">
                Data shared with Sui Quest stays on the blockchain.
              </p>
            </div>

            {/* Cards Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Funders Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A]
 rounded-2xl p-8 text-center">
                <div className="bg-slate-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <img
                      src={Dollar}
                      alt="dollar"
                      className="max-w-full h-auto"
                    />
                </div>
                <h3 className="text-xl font-bold mb-4">Funders</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Invest in Brilliance. Power the Next Sui Revolution. 
                  Builders Need Vision. Funders Make It Real. Join the 
                  Quest Where Code Meets Capital: The Sui 
                  Ecosystem Quest
                </p>
              </div>

              {/* Developers Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A]
 rounded-2xl p-8 text-center">
                <div className="bg-slate-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <img
                   src={Users}
                  alt="Group 1"
                  className="max-w-full h-auto"
                />
                </div>
                <h3 className="text-xl font-bold mb-4">Developers</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Code. Create. Conquer — The Sui Dev Quest 🚀
                  <br /><br />
                  Sui Creators Quest: Where Code Becomes Magic. ✨
                  <br />
                  Move with Purpose: A Quest for Sui Builders ⚡
                </p>
              </div>

              {/* Creatives Card */}
              <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A]
 rounded-2xl p-8 text-center">
                <div className="bg-slate-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <img
                  src ={Users}
                  alt="Group 1"
                  className="max-w-full h-auto"
                />
                </div>
                <h3 className="text-xl font-bold mb-4">Creatives</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Calling All Creators: The Sui Ecosystem Needs Your 
                  Voice 🎤 "Stories Shape Chains — What Will You 
                  Create on Sui? ✨ "Creativity Meets Crypto — Start 
                  Your Creator Journey on Sui 💡
                </p>
              </div>
            </div>

            {/* Get Started Section */}
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A]
 rounded-2xl p-12 text-center mb-8">
              
              <h3 className="text-2xl font-bold mb-6">🔒 Get Started</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Our business model is sponsorship. Big brands that want your attention give us
              </p>
            </div>

            {/* Get Started Button */}
            <div className="text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
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
