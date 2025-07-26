// import React, { useState } from 'react';

// interface WelcomeScreenProps {
//   onContinue?: () => void;
// }

// const OrganisationInfo: React.FC<OrganisationInfoProps> = ({ onContinue }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleContinue = () => {  
//     if (isChecked && onContinue) {
//       onContinue();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex flex-col">
//       {/* Navbar placeholder - replace with your existing navbar component */}
//       <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
//             <span className="text-white text-xs font-bold">S</span>
//           </div>
//           <span className="text-white font-medium">Sui Quest</span>
//         </div>
//         <div className="flex items-center space-x-6">
//           <button className="text-slate-300 hover:text-white transition-colors">
//             Discover
//           </button>
//           <button className="text-slate-300 hover:text-white transition-colors">
//             Search
//           </button>
//           <button className="text-slate-300 hover:text-white transition-colors">
//             Leaderboard
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
//             Connect wallet
//           </button>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="flex-1 flex items-center justify-center px-4">
//         <div className="max-w-md w-full">
//           {/* Welcome text */}
//           <div className="text-center mb-8">
//             <h1 className="text-white text-2xl font-medium mb-3">
//               Welcome to Sui Quest
//             </h1>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Before you begin, please review and accept our terms and conditions.
//             </p>
//           </div>

//           {/* Terms checkbox */}
//           <div className="mb-6">
//             <label className="flex items-start space-x-3 cursor-pointer group">
//               <div className="relative flex-shrink-0 mt-0.5">
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={(e) => setIsChecked(e.target.checked)}
//                   className="sr-only"
//                 />
//                 <div
//                   className={`w-4 h-4 border-2 rounded transition-all duration-200 ${
//                     isChecked
//                       ? 'bg-blue-600 border-blue-600'
//                       : 'border-slate-500 group-hover:border-slate-400'
//                   }`}
//                 >
//                   {isChecked && (
//                     <svg
//                       className="w-3 h-3 text-white absolute top-0.5 left-0.5"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </div>
//               <span className="text-slate-300 text-sm leading-relaxed select-none">
//                 I have read and agree to the{' '}
//                 <button className="text-blue-400 hover:text-blue-300 underline transition-colors">
//                   Terms and Condition
//                 </button>{' '}
//                 and{' '}
//                 <button className="text-blue-400 hover:text-blue-300 underline transition-colors">
//                   Privacy Policy
//                 </button>
//               </span>
//             </label>
//           </div>

//           {/* Continue button */}
//           <button
//             onClick={handleContinue}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             disabled={!isChecked}
//             className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
//               isChecked
//                 ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98]'
//                 : 'bg-slate-700 cursor-not-allowed opacity-50'
//             }`}
//           >
//             <span className={`transition-transform duration-200 ${isHovered && isChecked ? 'scale-105' : ''}`}>
//               Continue
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Background gradient overlay for depth */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 opacity-50 pointer-events-none" />
//     </div>
//   );
// };

// export default OrganisationInfo;