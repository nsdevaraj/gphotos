import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LogIn, UserCircle } from 'lucide-react';

interface AccountSelectorProps {
  label: string;
  account: string;
  onSelect: (account: string) => void;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ label, account, onSelect }) => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      // In production, you would validate the token and get user info
      onSelect('user@gmail.com');
    },
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  });

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 border border-purple-100 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{label}</h3>
      {!account ? (
        <button
          onClick={() => login()}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      ) : (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{account}</p>
            <button
              onClick={() => onSelect('')}
              className="text-sm text-purple-600 hover:text-purple-500 transition-colors"
            >
              Change account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;