import React from 'react';
import { Check, Play } from 'lucide-react';

interface Video {
  id: string;
  thumbnail: string;
  duration: string;
  title: string;
}

interface VideoGridProps {
  videos: Video[];
  selectedVideos: string[];
  onSelectVideo: (videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, selectedVideos, onSelectVideo }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="relative group cursor-pointer rounded-xl overflow-hidden"
          onClick={() => onSelectVideo(video.id)}
        >
          <div className="aspect-video relative">
            <img
              src={`${video.thumbnail}?w=600&h=400&fit=crop`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
              {video.duration}
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedVideos.includes(video.id) && (
              <div className="absolute inset-0 bg-purple-500/30 backdrop-blur-[2px]">
                <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Video Title */}
          <div className="p-3 bg-white/80 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {video.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;