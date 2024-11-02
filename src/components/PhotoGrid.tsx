import React from 'react';
import { Check } from 'lucide-react';

interface PhotoGridProps {
  photos: string[];
  selectedPhotos: string[];
  onSelectPhoto: (photo: string) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, selectedPhotos, onSelectPhoto }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div
          key={photo}
          className="relative aspect-square group cursor-pointer"
          onClick={() => onSelectPhoto(photo)}
        >
          <img
            src={`${photo}?w=400&fit=crop`}
            alt="Photo"
            className="w-full h-full object-cover rounded-lg"
          />
          <div
            className={`absolute inset-0 rounded-lg transition-colors ${
              selectedPhotos.includes(photo)
                ? 'bg-indigo-500/50'
                : 'bg-black/0 group-hover:bg-black/10'
            }`}
          />
          {selectedPhotos.includes(photo) && (
            <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;