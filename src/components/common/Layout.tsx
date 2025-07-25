// sui-quest\src\components\common\Layout.tsx
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  navbarProps?: {
    showAuthButton?: boolean;
    authButtonText?: string;
    authButtonAction?: () => void;
  };
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showNavbar = true, 
  navbarProps = {} 
}) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {showNavbar && <Navbar {...navbarProps} />}
      <main className={showNavbar ? '' : 'min-h-screen'}>
        {children}
      </main>
    </div>
  );
};

export default Layout;