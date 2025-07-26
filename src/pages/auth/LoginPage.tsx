// sui-quest\src\pages\auth\LoginPage.tsx
import React from 'react';
import SuiQuestLogin from '../../components/SuiQuestLogin';

const LoginPage: React.FC = () => {
  // Login page doesn't use Layout because it has its own custom header
  return <SuiQuestLogin onSignIn={() => {}} />;
};

export default LoginPage;