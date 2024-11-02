import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Video, ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import AccountSelector from './components/AccountSelector';
import VideoGrid from './components/VideoGrid';
import TransferStatus from './components/TransferStatus';

// For development, you can use a test client ID
// In production, replace with your actual Google OAuth client ID
const GOOGLE_CLIENT_ID = '263803124477-dqp4nq68ph7acjndi1peh5iun0vacmho.apps.googleusercontent.com';

function App() {
  const [sourceAccount, setSourceAccount] = useState('');
  const [targetAccount, setTargetAccount] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [transferStatus, setTransferStatus] = useState<'idle' | 'transferring' | 'success' | 'error'>('idle');

  const handleTransfer = async () => {
    if (selectedVideos.length === 0) return;
    
    setTransferStatus('transferring');
    try {
      // In production, implement actual Google Photos API calls here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTransferStatus('success');
      setSelectedVideos([]);
    } catch (error) {
      setTransferStatus('error');
      console.error('Transfer failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                Video Migration Tool
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {selectedVideos.length > 0 && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {selectedVideos.length} videos selected
                </span>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AccountSelector
                label="Source Account"
                account={sourceAccount}
                onSelect={setSourceAccount}
              />
              <div className="hidden md:flex justify-center">
                <ArrowRightLeft className="w-8 h-8 text-purple-400" />
              </div>
              <AccountSelector
                label="Target Account"
                account={targetAccount}
                onSelect={setTargetAccount}
              />
            </div>
          </div>

          {sourceAccount && targetAccount && (
            <>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-purple-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Select Videos to Transfer</h2>
                  </div>
                  <button
                    onClick={handleTransfer}
                    disabled={selectedVideos.length === 0 || transferStatus === 'transferring'}
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Transfer Selected Videos
                  </button>
                </div>
                <VideoGrid
                  videos={[
                    {
                      id: '1',
                      thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
                      duration: '2:30',
                      title: 'Beach Sunset'
                    },
                    {
                      id: '2',
                      thumbnail: 'https://images.unsplash.com/photo-1682687220063-4742bd7c98d7',
                      duration: '1:45',
                      title: 'Mountain Hike'
                    },
                    {
                      id: '3',
                      thumbnail: 'https://images.unsplash.com/photo-1682687220509-61b8a906ca19',
                      duration: '3:15',
                      title: 'City Lights'
                    }
                  ]}
                  selectedVideos={selectedVideos}
                  onSelectVideo={(videoId) => {
                    setSelectedVideos(prev =>
                      prev.includes(videoId)
                        ? prev.filter(id => id !== videoId)
                        : [...prev, videoId]
                    );
                  }}
                />
              </div>

              <TransferStatus status={transferStatus} />
            </>
          )}
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;