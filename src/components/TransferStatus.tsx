import React from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface TransferStatusProps {
  status: 'idle' | 'transferring' | 'success' | 'error';
}

const TransferStatus: React.FC<TransferStatusProps> = ({ status }) => {
  if (status === 'idle') return null;

  const statusConfig = {
    transferring: {
      icon: <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />,
      title: 'Transferring videos...',
      description: 'Please wait while we transfer your selected videos.',
      color: 'bg-purple-50 border-purple-200',
    },
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: 'Transfer complete!',
      description: 'Your videos have been successfully transferred.',
      color: 'bg-green-50 border-green-200',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      title: 'Transfer failed',
      description: 'An error occurred while transferring your videos. Please try again.',
      color: 'bg-red-50 border-red-200',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`rounded-xl border p-4 ${config.color} backdrop-blur-sm shadow-sm`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{config.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{config.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TransferStatus;